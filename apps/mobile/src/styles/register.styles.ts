import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const BackgroundGlowTop = styled.View`
  position: absolute;
  top: -100px;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  background-color: rgba(239, 68, 68, 0.15);
  align-self: center;
`;

export const BackgroundGlowBottom = styled.View`
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 250px;
  height: 250px;
  border-radius: 125px;
  background-color: rgba(249, 115, 22, 0.08);
`;

export const LogoSection = styled.View`
  align-items: center;
  margin-bottom: 32px;
`;

export const LogoContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background-color: #0f172a;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 8;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  margin-top: 16px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
`;

export const Card = styled.View`
  width: 90%;
  max-width: 400px;
  padding: 32px 24px;
  border-radius: 28px;
  background-color: ${(props) => props.theme.colors.card};
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.cardBorder};
  shadow-color: #000;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.1;
  shadow-radius: 15px;
  elevation: 10;
  align-self: center;
`;

export const CardTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const CardDescription = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
  margin-bottom: 24px;
`;

export const InputLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: 8px;
`;

export const Input = styled.TextInput<{ hasError?: boolean }>`
  height: 52px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${(props) => (props.hasError ? props.theme.colors.danger : props.theme.colors.border)};
  background-color: ${(props) => props.theme.colors.input};
  color: ${(props) => props.theme.colors.text};
  padding: 0px 16px;
  font-size: 15px;
  margin-bottom: 4px;
`;

export const FieldError = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.danger};
  margin-bottom: 12px;
  font-weight: 500;
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
  text-align: center;
  font-weight: 500;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 52px;
  border-radius: 14px;
  background-color: #0f172a;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

export const SubmitButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`;

export const LoginLink = styled.TouchableOpacity`
  align-items: center;
  margin-top: 24px;
`;

export const LoginLinkText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const LoginHighlight = styled.Text`
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
`;

export const FooterText = styled.Text`
  font-size: 10px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 16px;
`;
