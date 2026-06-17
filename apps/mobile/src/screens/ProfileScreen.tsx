import React from 'react';
import { Alert, Switch, Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { User, LogOut, Sun, Moon, Sparkles, ChevronRight } from 'lucide-react-native';
import { useAuthStore } from '../store/auth.store';
import { useThemeStore } from '../store/theme.store';
import { useStats } from '../hooks/useStats';
import { AuthService } from '../services/auth.service';

// External Styles
import {
  Container,
  ScrollView,
  ProfileHeader,
  AvatarContainer,
  AvatarImage,
  UserName,
  UserEmail,
  Badge,
  BadgeText,
  StatsCard,
  StatsTitle,
  Grid,
  GridItem,
  GridValue,
  GridLabel,
  DividerVertical,
  OptionsCard,
  OptionRow,
  OptionIconGroup,
  IconCircle,
  OptionLabel,
  DividerHorizontal,
} from '../styles/profile.styles';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { stats } = useStats();
  const appTheme = useTheme();

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await AuthService.logout();
          } catch (e) {
            console.warn('Logout API error:', e);
          } finally {
            // Log out locally anyway
            logout();
          }
        },
      },
    ]);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <ProfileHeader>
          <AvatarContainer>
            {user?.avatar ? (
              <AvatarImage source={{ uri: user.avatar }} />
            ) : (
              <User size={36} color="#ffffff" />
            )}
          </AvatarContainer>
          <UserName>{user?.name || 'User Name'}</UserName>
          <UserEmail>{user?.email || 'email@example.com'}</UserEmail>
          
          <Badge>
            <Sparkles size={12} color="#ffffff" />
            <BadgeText>Focus Master</BadgeText>
          </Badge>
        </ProfileHeader>

        {/* Focus Stats Summary Grid */}
        <StatsCard>
          <StatsTitle>Lifetime Achievements</StatsTitle>
          <Grid>
            <GridItem>
              <GridValue>{formatTime(stats.totalFocusTime)}</GridValue>
              <GridLabel>Focus Time</GridLabel>
            </GridItem>
            <DividerVertical />
            <GridItem>
              <GridValue>{stats.completedSessionsCount}</GridValue>
              <GridLabel>Sessions</GridLabel>
            </GridItem>
            <DividerVertical />
            <GridItem>
              <GridValue>{stats.completedTasksCount}</GridValue>
              <GridLabel>Tasks Completed</GridLabel>
            </GridItem>
          </Grid>
        </StatsCard>

        {/* Settings Options */}
        <OptionsCard>
          <OptionRow>
            <OptionIconGroup>
              <IconCircle bgColor="rgba(239, 68, 68, 0.1)">
                {theme === 'dark' ? <Moon size={20} color="#ef4444" /> : <Sun size={20} color="#ef4444" />}
              </IconCircle>
              <OptionLabel>Dark Mode</OptionLabel>
            </OptionIconGroup>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#cbd5e1', true: '#ef4444' }}
              thumbColor={Platform.OS === 'ios' ? '#ffffff' : theme === 'dark' ? '#ffffff' : '#f1f5f9'}
            />
          </OptionRow>

          <DividerHorizontal />

          <OptionRow onPress={handleLogout} activeOpacity={0.7}>
            <OptionIconGroup>
              <IconCircle bgColor="rgba(100, 116, 139, 0.1)">
                <LogOut size={20} color="#64748b" />
              </IconCircle>
              <OptionLabel style={{ color: '#ef4444' }}>Sign Out</OptionLabel>
            </OptionIconGroup>
            <ChevronRight size={18} color={appTheme.colors.textMuted} />
          </OptionRow>
        </OptionsCard>
      </ScrollView>
    </Container>
  );
}
