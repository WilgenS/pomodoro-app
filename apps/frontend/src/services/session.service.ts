import api from '../lib/axios';

export interface PomodoroSession {
  id: string;
  startedAt: string;
  endedAt: string | null;
  duration: number;
  taskId: string;
  userId: string;
}

export interface StartSessionDto {
  taskId: string;
  duration?: number;
}

export interface EndSessionDto {
  actualDuration?: number;
}

export const SessionService = {
  startSession: async (dto: StartSessionDto): Promise<PomodoroSession> => {
    const response = await api.post('/sessions/start', dto);
    return response.data;
  },

  endSession: async (id: string, dto: EndSessionDto): Promise<PomodoroSession> => {
    const response = await api.patch(`/sessions/${id}/end`, dto);
    return response.data;
  },
};
