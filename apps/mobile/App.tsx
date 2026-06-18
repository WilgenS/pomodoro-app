import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { useThemeStore } from './src/store/theme.store';
import { useAuthStore } from './src/store/auth.store';
import { AuthService } from './src/services/auth.service';
import { lightTheme, darkTheme } from './src/theme/theme';
import AppNavigator from './src/navigation/AppNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const themeType = useThemeStore((state) => state.theme);
  const activeTheme = themeType === 'dark' ? darkTheme : lightTheme;
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      console.log('Deep link received:', event.url);
      try {
        const tokenMatch = event.url.match(/[?&]access_token=([^&]+)/);
        const refreshMatch = event.url.match(/[?&]refresh_token=([^&]+)/);
        
        if (tokenMatch && refreshMatch) {
          const accessToken = decodeURIComponent(tokenMatch[1]);
          const refreshToken = decodeURIComponent(refreshMatch[1]);
          
          // Set temporary auth so getCurrentUser works (axios request interceptor will use this token)
          setAuth(
            { id: '', email: '', name: '' }, 
            accessToken, 
            refreshToken
          );
          
          // Fetch the actual user profile
          const userProfile = await AuthService.getCurrentUser();
          
          // Set the final authenticated state with real user profile
          setAuth(userProfile, accessToken, refreshToken);
          console.log('Successfully authenticated user via Google Login:', userProfile.email);
        }
      } catch (error) {
        console.error('Failed to authenticate via deep link:', error);
      }
    };

    // Add event listener for incoming deep links while the app is open
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if the app was launched via a deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [setAuth]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={activeTheme}>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style={themeType === 'dark' ? 'light' : 'dark'} />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
