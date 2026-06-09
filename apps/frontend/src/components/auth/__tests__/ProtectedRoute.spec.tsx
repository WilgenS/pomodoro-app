import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProtectedRoute } from '../protected-route';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as authStore from '../../../store/auth.store';

vi.mock('../../../store/auth.store', () => ({
  useAuthStore: vi.fn(),
}));

describe('ProtectedRoute', () => {
  it('redirects to login when not authenticated', () => {
    vi.mocked(authStore.useAuthStore).mockImplementation((selector) => 
      selector({
        isAuthenticated: false,
        user: null,
        setUser: vi.fn(),
        logout: vi.fn(),
      } as any)
    );

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders content when authenticated', () => {
    vi.mocked(authStore.useAuthStore).mockImplementation((selector) => 
      selector({
        isAuthenticated: true,
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        setUser: vi.fn(),
        logout: vi.fn(),
      } as any)
    );

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
