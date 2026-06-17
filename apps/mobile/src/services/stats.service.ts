import api from '../api/axios';

export interface UserStatistics {
  totalFocusTime: number; // in seconds
  completedSessionsCount: number;
  completedTasksCount: number;
}

export const StatsService = {
  getStats: async (): Promise<UserStatistics> => {
    const response = await api.get('/statistics');
    return response.data;
  },
};
