import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import Svg, { Circle as SvgCircle } from 'react-native-svg';
import { Play, Square, RotateCcw, CheckCircle2, Timer as TimerIcon, AlertCircle, Sparkles } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';

// Custom Hooks and Store Info
import { useTasks } from '../hooks/useTasks';
import { useTimer } from '../hooks/useTimer';
import { DURATIONS } from '../store/timer.store';

// External Styles
import {
  Container,
  ScrollView,
  Header,
  SparklesBadge,
  BadgeText,
  Title,
  Subtitle,
  TimerContainer,
  RingContainer,
  TimeLabelGroup,
  TimeText,
  ModeBadge,
  ModeText,
  ControlsRow,
  ControlBtn,
  PlayBtn,
  SectionCard,
  SectionTitle,
  SectionSubtitle,
  PickerContainer,
  AlertBox,
  AlertText,
  SelectedTaskInfo,
  GoalMeta,
  GoalLabel,
  GoalTitle,
  GoalProgress,
  ProgressValue,
  StrategyCard,
  StrategyTitle,
  StrategyDesc,
  DotsRow,
  Dot,
  DotsLabel,
} from '../styles/pomodoro.styles';

export default function PomodoroScreen() {
  const theme = useTheme();
  const { tasks } = useTasks();
  const {
    timeLeft,
    isActive,
    mode,
    completedWorkSessions,
    selectedTaskId,
    setSelectedTaskId,
    toggleTimer,
    resetTimer,
    completeSession,
    isStarting,
    isCompleting,
  } = useTimer();

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeLabel = () => {
    if (mode === 'work') return 'Focus Mode';
    if (mode === 'shortBreak') return 'Short Break';
    return 'Long Break';
  };

  // Circular progress calculations
  const totalDuration = DURATIONS[mode];
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  
  // Svg circular parameters
  const size = 260;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header>
          <SparklesBadge>
            <Sparkles size={12} color={theme.colors.textMuted} />
            <BadgeText>Focus Session</BadgeText>
          </SparklesBadge>
          <Title>Get in the Zone</Title>
          <Subtitle>Your productivity is a muscle. Train it with focus.</Subtitle>
        </Header>

        {/* Timer section */}
        <TimerContainer>
          <RingContainer>
            <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
              {/* Background Circle */}
              <SvgCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={theme.colors.secondary}
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Active Fill Circle */}
              <SvgCircle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={isActive ? theme.colors.primary : theme.colors.textMuted}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>

            <TimeLabelGroup>
              <TimeText>{formatTime(timeLeft)}</TimeText>
              <ModeBadge>
                <TimerIcon size={14} color={theme.colors.textMuted} />
                <ModeText>{getModeLabel()}</ModeText>
              </ModeBadge>
            </TimeLabelGroup>
          </RingContainer>

          {/* Controls */}
          <ControlsRow>
            <ControlBtn onPress={resetTimer} disabled={isStarting || isCompleting}>
              <RotateCcw size={22} color={theme.colors.textMuted} />
            </ControlBtn>

            <PlayBtn
              onPress={toggleTimer}
              disabled={(!selectedTaskId && mode === 'work') || isStarting || isCompleting}
              isActive={isActive}
            >
              {isStarting || isCompleting ? (
                <ActivityIndicator color={isActive ? theme.colors.text : '#ffffff'} />
              ) : isActive ? (
                <Square size={28} color={theme.colors.background} fill={theme.colors.background} />
              ) : (
                <Play size={28} color="#ffffff" fill="#ffffff" style={{ marginLeft: 4 }} />
              )}
            </PlayBtn>

            <ControlBtn onPress={completeSession} disabled={!isActive || isCompleting}>
              <CheckCircle2 size={22} color={theme.colors.textMuted} />
            </ControlBtn>
          </ControlsRow>
        </TimerContainer>

        {/* Task selection & info */}
        <SectionCard>
          <SectionTitle>Task Selection</SectionTitle>
          <SectionSubtitle>What are we focusing on right now?</SectionSubtitle>

          {/* Picker Dropdown */}
          <PickerContainer>
            <Picker
              selectedValue={selectedTaskId}
              onValueChange={(itemValue) => setSelectedTaskId(itemValue)}
              enabled={!isActive}
              style={{ color: theme.colors.text }}
              dropdownIconColor={theme.colors.textMuted}
            >
              <Picker.Item label="Select a task..." value={null} color={theme.colors.textMuted} />
              {tasks.filter(t => t.status !== 'COMPLETED').map((task) => (
                <Picker.Item
                  key={task.id}
                  label={task.title}
                  value={task.id}
                  color={theme.colors.text}
                />
              ))}
            </Picker>
          </PickerContainer>

          {!selectedTaskId && !isActive && (
            <AlertBox>
              <AlertCircle size={16} color="#b45309" />
              <AlertText>Select a task to start the session</AlertText>
            </AlertBox>
          )}

          {selectedTask ? (
            <SelectedTaskInfo>
              <GoalMeta>
                <GoalLabel>Current Goal</GoalLabel>
                <GoalTitle>{selectedTask.title}</GoalTitle>
              </GoalMeta>
              <GoalProgress>
                <GoalLabel>Progress</GoalLabel>
                <ProgressValue>
                  {selectedTask.completedPomodoros}/{selectedTask.estimatedPomodoros}
                </ProgressValue>
              </GoalProgress>
            </SelectedTaskInfo>
          ) : null}
        </SectionCard>

        {/* Focus strategy details */}
        <StrategyCard>
          <StrategyTitle>Focus Strategy</StrategyTitle>
          <StrategyDesc>
            The Pomodoro Technique is simple: 25 minutes of work followed by 5 minutes of rest. After 4 sessions, take a longer 15-minute break.
          </StrategyDesc>

          <DotsRow>
            {[1, 2, 3, 4].map((i) => (
              <Dot
                key={i}
                active={i <= (selectedTask?.completedPomodoros || completedWorkSessions) % 4}
              />
            ))}
          </DotsRow>
          <DotsLabel>Session progress (4 to goal)</DotsLabel>
        </StrategyCard>
      </ScrollView>
    </Container>
  );
}
