import { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SessionService } from '../services/session.service';

const DEFAULT_TIME = 25 * 60; // 25 minutes in seconds

export function useTimer(taskId: string | null) {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isActive, setIsActive] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const queryClient = useQueryClient();

  const startMutation = useMutation({
    mutationFn: SessionService.startSession,
    onSuccess: (data) => {
      setCurrentSessionId(data.id);
      setIsActive(true);
    },
  });

  const endMutation = useMutation({
    mutationFn: ({ id, duration }: { id: string; duration: number }) =>
      SessionService.endSession(id, { actualDuration: duration }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      resetTimer();
    },
  });

  const toggleTimer = async () => {
    if (isActive) {
      // Pause logic (optional, but requirement says "start/complete/reset")
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (!currentSessionId && taskId) {
        await startMutation.mutateAsync({ taskId, duration: DEFAULT_TIME / 60 });
      } else {
        setIsActive(true);
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(DEFAULT_TIME);
    setCurrentSessionId(null);
  };

  const completeSession = async () => {
    if (currentSessionId) {
      const actualDuration = DEFAULT_TIME - timeLeft;
      await endMutation.mutateAsync({ id: currentSessionId, duration: actualDuration });
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      completeSession();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  return {
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
    completeSession,
    isStarting: startMutation.isPending,
    isCompleting: endMutation.isPending,
  };
}
