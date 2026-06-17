import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Plus, ClipboardList, Trash2, Edit2, CheckCircle2, Circle, Zap, X } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTasks } from '../hooks/useTasks';
import type { Task, TaskStatus } from '../services/task.service';

// External Styles
import {
  Container,
  CenteredContainer,
  LoadingText,
  Header,
  HeaderTitleGroup,
  Title,
  Subtitle,
  AddButton,
  AddButtonText,
  TabsContainer,
  TabButton,
  TabText,
  EmptyContainer,
  IconBox,
  EmptyTitle,
  EmptySubtitle,
  EmptyButton,
  EmptyButtonText,
  TaskCard,
  TaskHeader,
  Checkbox,
  TaskInfo,
  TaskTitle,
  TaskDesc,
  ActionButtons,
  ActionButton,
  TaskFooter,
  ProgressBarTrack,
  ProgressBarFill,
  ProgressText,
  TipCard,
  TipIconBox,
  TipContent,
  TipTitle,
  TipText,
  ModalContainer,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  InputLabel,
  ModalInput,
  FieldError,
  PomoSelector,
  PomoOption,
  PomoText,
  SaveButton,
  SaveButtonText,
} from '../styles/tasks.styles';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  estimatedPomodoros: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Must estimate at least 1 Pomodoro').max(20, 'Maximum is 20 Pomodoros')
  ),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TasksScreen() {
  const theme = useTheme();
  const { tasks, isLoading, createTask, updateTask, deleteTask, isCreating, isUpdating } = useTasks();
  const [activeTab, setActiveTab] = useState<'ALL' | 'TODO' | 'COMPLETED'>('ALL');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      estimatedPomodoros: 1,
    },
  });

  const openAddModal = () => {
    setEditingTask(null);
    reset({
      title: '',
      description: '',
      estimatedPomodoros: 1,
    });
    setModalVisible(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    reset({
      title: task.title,
      description: task.description || '',
      estimatedPomodoros: task.estimatedPomodoros,
    });
    setModalVisible(true);
  };

  const handleSave = async (data: TaskFormData) => {
    try {
      if (editingTask) {
        await updateTask({
          id: editingTask.id,
          dto: {
            title: data.title,
            description: data.description,
            estimatedPomodoros: data.estimatedPomodoros,
          },
        });
      } else {
        await createTask({
          title: data.title,
          description: data.description,
          estimatedPomodoros: data.estimatedPomodoros,
        });
      }
      setModalVisible(false);
    } catch (e) {
      console.warn('Error saving task:', e);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const nextStatus: TaskStatus = task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    try {
      await updateTask({
        id: task.id,
        dto: { status: nextStatus },
      });
    } catch (e) {
      console.warn('Error updating status:', e);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTask(id);
          } catch (e) {
            console.warn('Error deleting task:', e);
          }
        },
      },
    ]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === 'TODO') return task.status !== 'COMPLETED';
    if (activeTab === 'COMPLETED') return task.status === 'COMPLETED';
    return true;
  });

  if (isLoading && tasks.length === 0) {
    return (
      <CenteredContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
        <LoadingText>Loading your goals...</LoadingText>
      </CenteredContainer>
    );
  }

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderTitleGroup>
          <Title>Tasks</Title>
          <Subtitle>Organize your work and track progress.</Subtitle>
        </HeaderTitleGroup>
        <AddButton onPress={openAddModal}>
          <Plus size={20} color="#ffffff" />
          <AddButtonText>Add Task</AddButtonText>
        </AddButton>
      </Header>

      {/* Tabs */}
      <TabsContainer>
        {(['ALL', 'TODO', 'COMPLETED'] as const).map((tab) => (
          <TabButton key={tab} active={activeTab === tab} onPress={() => setActiveTab(tab)}>
            <TabText active={activeTab === tab}>{tab}</TabText>
          </TabButton>
        ))}
      </TabsContainer>

      {/* Tasks List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyContainer>
            <IconBox>
              <ClipboardList size={40} color={theme.colors.textMuted} />
            </IconBox>
            <EmptyTitle>No tasks found</EmptyTitle>
            <EmptySubtitle>
              {activeTab === 'COMPLETED'
                ? "No completed tasks yet. Finish a focus session to complete them!"
                : "Your task list is empty. Start by adding your first goal."}
            </EmptySubtitle>
            {activeTab !== 'COMPLETED' && (
              <EmptyButton onPress={openAddModal}>
                <EmptyButtonText>Create Task</EmptyButtonText>
              </EmptyButton>
            )}
          </EmptyContainer>
        }
        renderItem={({ item }) => (
          <TaskCard isCompleted={item.status === 'COMPLETED'}>
            <TaskHeader>
              <Checkbox onPress={() => handleToggleStatus(item)}>
                {item.status === 'COMPLETED' ? (
                  <CheckCircle2 size={24} color={theme.colors.primary} />
                ) : (
                  <Circle size={24} color={theme.colors.textMuted} />
                )}
              </Checkbox>

              <TaskInfo>
                <TaskTitle isCompleted={item.status === 'COMPLETED'}>{item.title}</TaskTitle>
                {item.description ? <TaskDesc>{item.description}</TaskDesc> : null}
              </TaskInfo>

              <ActionButtons>
                <ActionButton onPress={() => openEditModal(item)}>
                  <Edit2 size={16} color={theme.colors.textMuted} />
                </ActionButton>
                <ActionButton onPress={() => handleDelete(item.id)}>
                  <Trash2 size={16} color={theme.colors.danger} />
                </ActionButton>
              </ActionButtons>
            </TaskHeader>

            <TaskFooter>
              <ProgressBarTrack>
                <ProgressBarFill
                  progress={(item.completedPomodoros / item.estimatedPomodoros) * 100}
                />
              </ProgressBarTrack>
              <ProgressText>
                {item.completedPomodoros} / {item.estimatedPomodoros} Pomodoros
              </ProgressText>
            </TaskFooter>
          </TaskCard>
        )}
      />

      {/* Power Tip footer */}
      {tasks.length > 0 && (
        <TipCard>
          <TipIconBox>
            <Zap size={20} color="#eab308" />
          </TipIconBox>
          <TipContent>
            <TipTitle>Power Tip</TipTitle>
            <TipText>Break large tasks into smaller, manageable chunks for better focus.</TipText>
          </TipContent>
        </TipCard>
      )}

      {/* Task Form Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <ModalContainer>
          <ModalOverlay onPress={() => setModalVisible(false)} />
          <ModalContent>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <ModalHeader>
                <ModalTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</ModalTitle>
                <CloseButton onPress={() => setModalVisible(false)}>
                  <X size={20} color={theme.colors.text} />
                </CloseButton>
              </ModalHeader>

              <InputLabel>Title</InputLabel>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ModalInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="What are you working on?"
                    placeholderTextColor="#94a3b8"
                    hasError={!!errors.title}
                  />
                )}
              />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}

              <InputLabel>Description (Optional)</InputLabel>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ModalInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Short description..."
                    placeholderTextColor="#94a3b8"
                    multiline
                    numberOfLines={3}
                    style={{ height: 80, textAlignVertical: 'top', paddingTop: 12 }}
                  />
                )}
              />

              <InputLabel>Estimated Pomodoros</InputLabel>
              <Controller
                control={control}
                name="estimatedPomodoros"
                render={({ field: { onChange, value } }) => (
                  <PomoSelector>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <PomoOption
                        key={num}
                        selected={Number(value) === num}
                        onPress={() => onChange(num)}
                      >
                        <PomoText selected={Number(value) === num}>{num}</PomoText>
                      </PomoOption>
                    ))}
                  </PomoSelector>
                )}
              />
              {errors.estimatedPomodoros && <FieldError>{errors.estimatedPomodoros.message}</FieldError>}

              <SaveButton onPress={handleSubmit(handleSave)} disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <SaveButtonText>Save Task</SaveButtonText>
                )}
              </SaveButton>
            </KeyboardAvoidingView>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
