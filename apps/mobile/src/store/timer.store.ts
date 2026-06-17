import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export const DURATIONS = {
  work: 25 * 60,       // 25 minutes
  shortBreak: 5 * 60,  // 5 minutes
  longBreak: 15 * 60,  // 15 minutes
};

interface TimerState {
  timeLeft: number;
  isActive: boolean;
  mode: TimerMode;
  completedWorkSessions: number;
  selectedTaskId: string | null;
  currentSessionId: string | null;
  endTime: number | null;
  notificationId: string | null;

  setSelectedTaskId: (taskId: string | null) => void;
  setCurrentSessionId: (sessionId: string | null) => void;
  setMode: (mode: TimerMode) => void;
  startTimer: (endTimeMs: number, notificationId: string | null) => void;
  pauseTimer: () => void;
  resumeTimer: (endTimeMs: number, notificationId: string | null) => void;
  resetTimer: () => void;
  tick: () => void;
  setTimeLeft: (seconds: number) => void;
  incrementCompletedWorkSessions: () => void;
  syncBackgroundTime: () => { finishedInBackground: boolean; elapsedSeconds: number } | null;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      timeLeft: DURATIONS.work,
      isActive: false,
      mode: 'work',
      completedWorkSessions: 0,
      selectedTaskId: null,
      currentSessionId: null,
      endTime: null,
      notificationId: null,

      setSelectedTaskId: (selectedTaskId) => set({ selectedTaskId }),
      setCurrentSessionId: (currentSessionId) => set({ currentSessionId }),
      
      setMode: (mode) => set({ 
        mode, 
        timeLeft: DURATIONS[mode],
        isActive: false,
        endTime: null,
        notificationId: null
      }),

      startTimer: (endTime, notificationId) => set({ 
        isActive: true, 
        endTime,
        notificationId
      }),

      pauseTimer: () => {
        const { notificationId } = get();
        if (notificationId) {
          Notifications.cancelScheduledNotificationAsync(notificationId).catch(() => {});
        }
        set({ 
          isActive: false, 
          endTime: null,
          notificationId: null 
        });
      },

      resumeTimer: (endTime, notificationId) => set({ 
        isActive: true, 
        endTime,
        notificationId
      }),

      resetTimer: () => {
        const { notificationId, mode } = get();
        if (notificationId) {
          Notifications.cancelScheduledNotificationAsync(notificationId).catch(() => {});
        }
        set({
          timeLeft: DURATIONS[mode],
          isActive: false,
          endTime: null,
          notificationId: null,
          currentSessionId: null
        });
      },

      tick: () => {
        const { timeLeft, isActive } = get();
        if (isActive && timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 });
        }
      },

      setTimeLeft: (timeLeft) => set({ timeLeft }),

      incrementCompletedWorkSessions: () => set((state) => ({ 
        completedWorkSessions: state.completedWorkSessions + 1 
      })),

      syncBackgroundTime: () => {
        const { endTime, isActive, timeLeft } = get();
        if (!isActive || !endTime) return null;

        const now = Date.now();
        const diffSeconds = Math.round((endTime - now) / 1000);

        if (diffSeconds <= 0) {
          // Finished in background
          set({
            timeLeft: 0,
            isActive: false,
            endTime: null,
            notificationId: null,
          });
          return { finishedInBackground: true, elapsedSeconds: timeLeft };
        } else {
          // Still running, update timeLeft
          const elapsed = timeLeft - diffSeconds;
          set({
            timeLeft: diffSeconds,
          });
          return { finishedInBackground: false, elapsedSeconds: elapsed };
        }
      },
    }),
    {
      name: 'pomodoro-timer-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
