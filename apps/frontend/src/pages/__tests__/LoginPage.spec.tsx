import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '../LoginPage';
import { BrowserRouter } from 'react-router-dom';

// Mock the auth store
vi.mock('../../store/auth.store', () => ({
  useAuthStore: vi.fn((selector) => selector({
    isAuthenticated: false,
  })),
}));

describe('LoginPage', () => {
  it('renders login page with Google button', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Pomodoro/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue with Google/i)).toBeInTheDocument();
  });

  it('contains the correct Google login link', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: /Continue with Google/i });
    expect(loginButton).toBeInTheDocument();
  });
});
