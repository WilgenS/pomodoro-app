import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { useTimerStore, DURATIONS, TimerMode } from '../store/timer.store';
import { SessionService } from '../services/session.service';

// Configure notifications to show even when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function scheduleTimerNotification(seconds: number, mode: TimerMode) {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;
  if (status !== 'granted') {
    const { status: askStatus } = await Notifications.requestPermissionsAsync();
    finalStatus = askStatus;
  }
  if (finalStatus !== 'granted') {
    return null;
  }

  let title = 'Pomodoro Focus Finished!';
  let body = 'Great job! Time for a well-deserved break.';
  if (mode === 'shortBreak') {
    title = 'Short Break Ended!';
    body = 'Break is over. Ready to get back to work?';
  } else if (mode === 'longBreak') {
    title = 'Long Break Ended!';
    body = 'Ready for another round of focus? Let\'s go!';
  }

  try {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: {
        seconds,
      },
    });
    return identifier;
  } catch (e) {
    console.warn('Notification schedule error:', e);
    return null;
  }
}

export function useTimer() {
  const queryClient = useQueryClient();
  const appState = useRef(AppState.currentState);

  const {
    timeLeft,
    isActive,
    mode,
    completedWorkSessions,
    selectedTaskId,
    currentSessionId,
    endTime,
    setSelectedTaskId,
    setMode,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    tick,
    setTimeLeft,
    incrementCompletedWorkSessions,
    syncBackgroundTime,
  } = useTimerStore();

  const startMutation = useMutation({
    mutationFn: SessionService.startSession,
  });

  const endMutation = useMutation({
    mutationFn: ({ id, duration }: { id: string; duration: number }) =>
      SessionService.endSession(id, { actualDuration: duration }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  const handleTimerCompletion = async () => {
    // Save state before changing
    const currentMode = useTimerStore.getState().mode;
    const sessionId = useTimerStore.getState().currentSessionId;

    if (currentMode === 'work') {
      if (sessionId) {
        // Complete the focus session on the backend
        await endMutation.mutateAsync({ id: sessionId, duration: DURATIONS.work });
      }
      
      incrementCompletedWorkSessions();
      
      // Calculate next mode based on updated count
      const nextCount = useTimerStore.getState().completedWorkSessions;
      const nextMode: TimerMode = nextCount % 4 === 0 ? 'longBreak' : 'shortBreak';
      
      setMode(nextMode);
    } else {
      // Break is over
      setMode('work');
    }
  };

  const completeSession = async () => {
    if (mode === 'work') {
      if (currentSessionId) {
        const actualDuration = DURATIONS.work - timeLeft;
        await endMutation.mutateAsync({ id: currentSessionId, duration: actualDuration });
      }
      incrementCompletedWorkSessions();
      
      const nextCount = useTimerStore.getState().completedWorkSessions;
      const nextMode: TimerMode = nextCount % 4 === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
    } else {
      setMode('work');
    }
  };

  const toggleTimer = async () => {
    if (isActive) {
      pauseTimer();
    } else {
      const notifId = await scheduleTimerNotification(timeLeft, mode);
      const endTimeMs = Date.now() + timeLeft * 1000;

      if (mode === 'work' && !currentSessionId && selectedTaskId) {
        try {
          const session = await startMutation.mutateAsync({
            taskId: selectedTaskId,
            duration: Math.round(DURATIONS.work / 60),
          });
          useTimerStore.getState().setCurrentSessionId(session.id);
          startTimer(endTimeMs, notifId);
        } catch (e) {
          console.warn('Failed to start session on backend:', e);
          // Fallback to offline work timer
          startTimer(endTimeMs, notifId);
        }
      } else {
        resumeTimer(endTimeMs, notifId);
      }
    }
  };

  // Timer Tick Interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        const curTimeLeft = useTimerStore.getState().timeLeft;
        if (curTimeLeft > 1) {
          tick();
        } else {
          // Timer finished!
          if (interval) clearInterval(interval);
          handleTimerCompletion();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Background state syncing
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const syncResult = syncBackgroundTime();
        if (syncResult && syncResult.finishedInBackground) {
          handleTimerCompletion();
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    timeLeft,
    isActive,
    mode,
    completedWorkSessions,
    selectedTaskId,
    currentSessionId,
    setSelectedTaskId,
    setMode,
    toggleTimer,
    resetTimer,
    completeSession,
    isStarting: startMutation.isPending,
    isCompleting: endMutation.isPending,
  };
}
