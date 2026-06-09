import api from '../lib/axios';

export interface UserStatistics {
  totalFocusTime: number;
  completedSessionsCount: number;
  completedTasksCount: number;
}

export const StatsService = {
  getStatistics: async (): Promise<UserStatistics> => {
    const response = await api.get('/statistics');
    return response.data;
  },
};
