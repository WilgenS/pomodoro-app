import React, { useState } from 'react';
import { ActivityIndicator, Linking, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Timer } from 'lucide-react-native';
import { CONFIG } from '../constants/config';
import {
  Container,
  BackgroundGlowTop,
  BackgroundGlowBottom,
  LogoSection,
  LogoContainer,
  Title,
  Subtitle,
  Card,
  CardTitle,
  CardDescription,
  GoogleButton,
  GoogleButtonText,
  ErrorText,
  FooterText,
} from '../styles/login.styles';

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const redirectUri = Platform.OS === 'web'
        ? window.location.origin
        : 'pomodoro://auth-callback';
      const authUrl = `${CONFIG.API_URL}/auth/google?state=${encodeURIComponent(redirectUri)}`;
      
      await Linking.openURL(authUrl);
      
      // Keep loading on since the user is in the browser and will be redirected back
      // If they cancel or come back, we reset loading. We can do a small delay to allow returning.
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    } catch (error: any) {
      console.warn('Login error:', error);
      setErrorMsg('Could not launch browser. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackgroundGlowTop />
      <BackgroundGlowBottom />
      
      <LogoSection>
        <LogoContainer>
          <Timer size={44} color="#ffffff" />
        </LogoContainer>
        <Title>Pomodoro</Title>
        <Subtitle>Productivity Simplified</Subtitle>
      </LogoSection>

      <Card>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Only Google Accounts are supported for secure access.</CardDescription>

        {errorMsg && <ErrorText>{errorMsg}</ErrorText>}

        <GoogleButton onPress={handleGoogleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <>
              <GoogleIcon />
              <GoogleButtonText>Continue with Google</GoogleButtonText>
            </>
          )}
        </GoogleButton>
      </Card>
      
      <FooterText>Secured by Google Cloud</FooterText>
    </Container>
  );
}
