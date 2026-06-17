import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(() => Promise.resolve(null)),
    setItem: vi.fn(() => Promise.resolve()),
    removeItem: vi.fn(() => Promise.resolve()),
    clear: vi.fn(() => Promise.resolve()),
  },
}));

vi.mock('expo-notifications', () => ({
  setNotificationHandler: vi.fn(),
  getPermissionsAsync: vi.fn(() => Promise.resolve({ status: 'granted' })),
  requestPermissionsAsync: vi.fn(() => Promise.resolve({ status: 'granted' })),
  scheduleNotificationAsync: vi.fn(() => Promise.resolve('mock-notif-id')),
  cancelScheduledNotificationAsync: vi.fn(() => Promise.resolve()),
  AndroidNotificationPriority: {
    HIGH: 'high',
  },
}));

import { useTimerStore, DURATIONS } from '../store/timer.store';

describe('Timer Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useTimerStore.getState().resetTimer();
    useTimerStore.getState().setMode('work');
  });

  it('should initialize with correct default work duration', () => {
    const state = useTimerStore.getState();
    expect(state.timeLeft).toBe(DURATIONS.work);
    expect(state.isActive).toBe(false);
    expect(state.mode).toBe('work');
  });

  it('should change mode and adjust timeLeft correctly', () => {
    const state = useTimerStore.getState();
    state.setMode('shortBreak');
    expect(useTimerStore.getState().mode).toBe('shortBreak');
    expect(useTimerStore.getState().timeLeft).toBe(DURATIONS.shortBreak);

    state.setMode('longBreak');
    expect(useTimerStore.getState().mode).toBe('longBreak');
    expect(useTimerStore.getState().timeLeft).toBe(DURATIONS.longBreak);
  });

  it('should start timer with correct endTime and active status', () => {
    const state = useTimerStore.getState();
    const mockEndTime = Date.now() + 1500 * 1000;
    state.startTimer(mockEndTime, 'mock-notif-id');

    expect(useTimerStore.getState().isActive).toBe(true);
    expect(useTimerStore.getState().endTime).toBe(mockEndTime);
    expect(useTimerStore.getState().notificationId).toBe('mock-notif-id');
  });

  it('should pause timer and clear endTime and notificationId', () => {
    const state = useTimerStore.getState();
    const mockEndTime = Date.now() + 1500 * 1000;
    
    state.startTimer(mockEndTime, 'mock-notif-id');
    state.pauseTimer();

    expect(useTimerStore.getState().isActive).toBe(false);
    expect(useTimerStore.getState().endTime).toBeNull();
    expect(useTimerStore.getState().notificationId).toBeNull();
  });

  it('should decrement timeLeft on tick if active', () => {
    const state = useTimerStore.getState();
    const initialTime = state.timeLeft;
    
    // If not active, tick does nothing
    state.tick();
    expect(useTimerStore.getState().timeLeft).toBe(initialTime);

    // If active, tick decrements
    state.startTimer(Date.now() + 1000, null);
    state.tick();
    expect(useTimerStore.getState().timeLeft).toBe(initialTime - 1);
  });
});
