import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Timer, CheckSquare, BarChart3, Calendar } from 'lucide-react-native';
import { useStats } from '../hooks/useStats';

// External Styles
import {
  Container,
  CenteredContainer,
  ActivityIndicator,
  LoadingText,
  Header,
  Title,
  Subtitle,
  CardsContainer,
  Card,
  IconWrapper,
  CardContent,
  CardLabel,
  CardValue,
  CardDesc,
  SectionCard,
  SectionHeader,
  SectionTitleGroup,
  SectionTitle,
  SectionSubtitle,
  DateBadge,
  DateText,
  ChartContainer,
  ChartGridLines,
  GridLine,
  ChartBars,
  BarWrapper,
  BarTrack,
  BarFill,
  BarLabel,
  BottomRow,
  DistributionList,
  DistItem,
  DistLabelGroup,
  DistLabel,
  DistValue,
  ProgressTrack,
  ProgressBar,
  AchievementList,
  AchievementItem,
  BadgeContainer,
  BadgeText,
  AchievementContent,
  AchievementTitle,
  AchievementDesc,
} from '../styles/dashboard.styles';

export default function DashboardScreen() {
  const { stats, isLoading, isError, refetch } = useStats();
  const theme = useTheme();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const onRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <CenteredContainer>
        <ActivityIndicator color={theme.colors.primary} size="large" />
        <LoadingText>Loading your progress...</LoadingText>
      </CenteredContainer>
    );
  }

  // Define mock weekly data for chart
  const weeklyData = [
    { day: 'Mon', value: 4, height: '40%' },
    { day: 'Tue', value: 7, height: '70%' },
    { day: 'Wed', value: 5, height: '50%' },
    { day: 'Thu', value: 9, height: '90%' },
    { day: 'Fri', value: 12, height: '100%', active: true },
    { day: 'Sat', value: 3, height: '30%' },
    { day: 'Sun', value: 6, height: '60%' },
  ];

  const cards = [
    {
      label: 'Focus Time',
      value: formatTime(stats.totalFocusTime),
      icon: <Timer color={theme.colors.primary} size={24} />,
      desc: 'Total time spent in deep work',
    },
    {
      label: 'Sessions',
      value: stats.completedSessionsCount,
      icon: <BarChart3 color={theme.colors.primary} size={24} />,
      desc: 'Completed pomodoro cycles',
    },
    {
      label: 'Tasks',
      value: stats.completedTasksCount,
      icon: <CheckSquare color={theme.colors.primary} size={24} />,
      desc: 'Goals achieved this period',
    },
  ];

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} tintColor={theme.colors.primary} />
        }
      >
        <Header>
          <Title>Your Progress</Title>
          <Subtitle>Visualize your productivity and focus trends.</Subtitle>
        </Header>

        {/* Metric Cards */}
        <CardsContainer>
          {cards.map((card, i) => (
            <Card key={i}>
              <IconWrapper>{card.icon}</IconWrapper>
              <CardContent>
                <CardLabel>{card.label}</CardLabel>
                <CardValue>{card.value}</CardValue>
                <CardDesc>{card.desc}</CardDesc>
              </CardContent>
            </Card>
          ))}
        </CardsContainer>

        {/* Activity Chart */}
        <SectionCard>
          <SectionHeader>
            <SectionTitleGroup>
              <SectionTitle>Activity Overview</SectionTitle>
              <SectionSubtitle>Number of sessions per day this week</SectionSubtitle>
            </SectionTitleGroup>
            <DateBadge>
              <Calendar size={14} color={theme.colors.textMuted} />
              <DateText>May 4 - May 10</DateText>
            </DateBadge>
          </SectionHeader>

          <ChartContainer>
            <ChartGridLines>
              <GridLine />
              <GridLine />
              <GridLine />
              <GridLine />
            </ChartGridLines>

            <ChartBars>
              {weeklyData.map((data, index) => (
                <BarWrapper key={index}>
                  <BarTrack>
                    <BarFill fillHeight={data.height} isActive={data.active} />
                  </BarTrack>
                  <BarLabel>{data.day}</BarLabel>
                </BarWrapper>
              ))}
            </ChartBars>
          </ChartContainer>
        </SectionCard>

        {/* Focus Distribution & Achievements */}
        <BottomRow>
          <SectionCard>
            <SectionTitleGroup>
              <SectionTitle>Focus Distribution</SectionTitle>
            </SectionTitleGroup>

            <DistributionList>
              {[
                { label: 'Deep Work', value: '65%', width: '65%', color: theme.colors.textTitle },
                { label: 'Short Breaks', value: '20%', width: '20%', color: '#64748b' },
                { label: 'Long Breaks', value: '15%', width: '15%', color: '#cbd5e1' },
              ].map((item, index) => (
                <DistItem key={index}>
                  <DistLabelGroup>
                    <DistLabel>{item.label}</DistLabel>
                    <DistValue>{item.value}</DistValue>
                  </DistLabelGroup>
                  <ProgressTrack>
                    <ProgressBar fillWidth={item.width} barColor={item.color} />
                  </ProgressTrack>
                </DistItem>
              ))}
            </DistributionList>
          </SectionCard>

          <SectionCard>
            <SectionTitleGroup>
              <SectionTitle>Recent Achievements</SectionTitle>
            </SectionTitleGroup>

            <AchievementList>
              {[
                { title: 'Consistency King', desc: '5 days streak reached', icon: '🔥', bgColor: 'rgba(249, 115, 22, 0.1)' },
                { title: 'Early Bird', desc: 'Started session before 7 AM', icon: '🌅', bgColor: 'rgba(59, 130, 246, 0.1)' },
                { title: 'Focus Master', desc: 'Completed 10 sessions today', icon: '⭐', bgColor: 'rgba(234, 179, 8, 0.1)' },
              ].map((item, index) => (
                <AchievementItem key={index}>
                  <BadgeContainer bgColor={item.bgColor}>
                    <BadgeText>{item.icon}</BadgeText>
                  </BadgeContainer>
                  <AchievementContent>
                    <AchievementTitle>{item.title}</AchievementTitle>
                    <AchievementDesc>{item.desc}</AchievementDesc>
                  </AchievementContent>
                </AchievementItem>
              ))}
            </AchievementList>
          </SectionCard>
        </BottomRow>
      </ScrollView>
    </Container>
  );
}
