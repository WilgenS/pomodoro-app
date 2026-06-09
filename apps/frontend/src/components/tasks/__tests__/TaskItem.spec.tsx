import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskItem } from '../TaskItem';
import type { Task } from '../../../services/task.service';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'TODO',
  estimatedPomodoros: 4,
  completedPomodoros: 0,
  createdAt: new Date().toISOString(),
};

describe('TaskItem', () => {
  it('renders task details correctly', () => {
    render(
      <TaskItem
        task={mockTask}
        onUpdate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('0/4 poms')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <TaskItem
        task={mockTask}
        onUpdate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />
    );

    const deleteButton = screen.getAllByRole('button')[2]; // Adjusting based on structure (Toggle, Edit, Delete)
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('applies completed styles when task is completed', () => {
    const completedTask = { ...mockTask, status: 'COMPLETED' as const };
    render(
      <TaskItem
        task={completedTask}
        onUpdate={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    const title = screen.getByText('Test Task');
    expect(title).toHaveClass('line-through');
  });
});
