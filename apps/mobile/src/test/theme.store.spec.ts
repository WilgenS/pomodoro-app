import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: vi.fn(() => Promise.resolve(null)),
    setItem: vi.fn(() => Promise.resolve()),
    removeItem: vi.fn(() => Promise.resolve()),
    clear: vi.fn(() => Promise.resolve()),
  },
}));

import { useThemeStore } from '../store/theme.store';

describe('Theme Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useThemeStore.getState().setTheme('light');
  });

  it('should have light theme as default', () => {
    const state = useThemeStore.getState();
    expect(state.theme).toBe('light');
  });

  it('should toggle theme between light and dark', () => {
    const state = useThemeStore.getState();
    expect(state.theme).toBe('light');

    state.toggleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');

    state.toggleTheme();
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('should set theme to specific mode', () => {
    const state = useThemeStore.getState();
    state.setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
    
    state.setTheme('light');
    expect(useThemeStore.getState().theme).toBe('light');
  });
});
