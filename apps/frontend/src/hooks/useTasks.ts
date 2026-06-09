import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '../services/task.service';
import type { CreateTaskDto, UpdateTaskDto } from '../services/task.service';

export function useTasks() {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: () => TaskService.getTasks(),
  });

  const createMutation = useMutation({
    mutationFn: (dto: CreateTaskDto) => TaskService.createTask(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateTaskDto }) =>
      TaskService.updateTask(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => TaskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks: tasksQuery.data?.data || [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    createTask: createMutation.mutateAsync,
    updateTask: updateMutation.mutateAsync,
    deleteTask: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}
