import api from '../lib/axios';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  estimatedPomodoros: number;
  completedPomodoros: number;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  estimatedPomodoros?: number;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  status?: TaskStatus;
}

export const TaskService = {
  getTasks: async (page = 1, limit = 10) => {
    const response = await api.get(`/tasks?page=${page}&limit=${limit}`);
    return response.data;
  },

  createTask: async (dto: CreateTaskDto) => {
    const response = await api.post('/tasks', dto);
    return response.data;
  },

  updateTask: async (id: string, dto: UpdateTaskDto) => {
    const response = await api.patch(`/tasks/${id}`, dto);
    return response.data;
  },

  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },
};
