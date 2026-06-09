import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';

export function useAuth() {
  const { setUser, logout, isAuthenticated } = useAuthStore();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: AuthService.getCurrentUser,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (isError) {
      logout();
    }
  }, [data, isError, setUser, logout]);

  return {
    user: data,
    isLoading,
    isAuthenticated,
    refetch,
  };
}
