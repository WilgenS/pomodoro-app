import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Timer } from 'lucide-react-native';
import { useAuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';

// External Styles
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
  InputLabel,
  Input,
  FieldError,
  ErrorText,
  SubmitButton,
  SubmitButtonText,
  RegisterLink,
  RegisterLinkText,
  RegisterHighlight,
  FooterText,
} from '../styles/login.styles';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen({ navigation }: any) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await AuthService.login(data.email);
      const userProfile = await AuthService.getCurrentUser();
      setAuth(userProfile, response.accessToken, response.refreshToken);
    } catch (error: any) {
      console.warn('Login error:', error);
      setErrorMsg(error.response?.data?.message || 'Invalid email or network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <BackgroundGlowTop />
      <BackgroundGlowBottom />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <LogoSection>
            <LogoContainer>
              <Timer size={44} color="#ffffff" />
            </LogoContainer>
            <Title>Pomodoro</Title>
            <Subtitle>Productivity Simplified</Subtitle>
          </LogoSection>

          <Card>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your email to continue</CardDescription>

            {errorMsg && <ErrorText>{errorMsg}</ErrorText>}

            <InputLabel>Email Address</InputLabel>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="e.g. test@example.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  hasError={!!errors.email}
                />
              )}
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}

            <SubmitButton onPress={handleSubmit(onSubmit)} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <SubmitButtonText>Continue</SubmitButtonText>
              )}
            </SubmitButton>

            <RegisterLink onPress={() => navigation.navigate('Register')}>
              <RegisterLinkText>
                Don't have an account? <RegisterHighlight>Sign Up</RegisterHighlight>
              </RegisterLinkText>
            </RegisterLink>
          </Card>
          
          <FooterText>Secured by Google Cloud</FooterText>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
});
