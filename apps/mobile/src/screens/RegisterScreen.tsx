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
  LoginLink,
  LoginLinkText,
  LoginHighlight,
  FooterText,
} from '../styles/register.styles';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen({ navigation }: any) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await AuthService.register(data.email, data.name);
      const userProfile = await AuthService.getCurrentUser();
      setAuth(userProfile, response.accessToken, response.refreshToken);
    } catch (error: any) {
      console.warn('Registration error:', error);
      setErrorMsg(error.response?.data?.message || 'Email already exists or network error');
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
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your productivity account</CardDescription>

            {errorMsg && <ErrorText>{errorMsg}</ErrorText>}

            <InputLabel>Full Name</InputLabel>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="e.g. John Doe"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!loading}
                  hasError={!!errors.name}
                />
              )}
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}

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
                <SubmitButtonText>Register</SubmitButtonText>
              )}
            </SubmitButton>

            <LoginLink onPress={() => navigation.navigate('Login')}>
              <LoginLinkText>
                Already have an account? <LoginHighlight>Sign In</LoginHighlight>
              </LoginLinkText>
            </LoginLink>
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
