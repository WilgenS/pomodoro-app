import { useQuery } from '@tanstack/react-query';
import { StatsService } from '../services/stats.service';

export function useStats() {
  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: () => StatsService.getStats(),
  });

  return {
    stats: statsQuery.data || { totalFocusTime: 0, completedSessionsCount: 0, completedTasksCount: 0 },
    isLoading: statsQuery.isLoading,
    isError: statsQuery.isError,
    refetch: statsQuery.refetch,
  };
}
