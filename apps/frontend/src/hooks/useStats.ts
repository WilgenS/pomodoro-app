import { useQuery } from '@tanstack/react-query';
import { StatsService } from '../services/stats.service';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: StatsService.getStatistics,
    refetchInterval: 1000 * 60, // Refetch every minute
  });
}
