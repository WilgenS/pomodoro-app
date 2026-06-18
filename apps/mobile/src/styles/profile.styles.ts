import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ScrollView = styled.ScrollView``;

export const ProfileHeader = styled.View`
  align-items: center;
  padding: 40px 24px;
`;

export const AvatarContainer = styled.View`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: #0f172a;
  align-items: center;
  justify-content: center;
  border-width: 4px;
  border-color: ${(props) => props.theme.colors.cardBorder};
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 6;
`;

export const AvatarImage = styled.Image`
  width: 88px;
  height: 88px;
  border-radius: 44px;
`;

export const UserName = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.textTitle};
  margin-top: 16px;
`;

export const UserEmail = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
`;

export const Badge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 12px;
  background-color: #0f172a;
  margin-top: 16px;
`;

export const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
`;

export const StatsCard = styled.View`
  margin: 0px 24px 24px 24px;
  padding: 24px;
  border-radius: 28px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.card};
  shadow-color: ${(props) => props.theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.02;
  shadow-radius: 4px;
  elevation: 1;
`;

export const StatsTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textTitle};
  margin-bottom: 20px;
`;

export const Grid = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const GridItem = styled.View`
  align-items: center;
  flex: 1;
`;

export const GridValue = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.textTitle};
`;

export const GridLabel = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
  text-align: center;
`;

export const DividerVertical = styled.View`
  width: 1px;
  height: 36px;
  background-color: ${(props) => props.theme.colors.border};
`;

export const OptionsCard = styled.View`
  margin: 0px 24px;
  border-radius: 28px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.card};
  overflow: hidden;
`;

export const OptionRow = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
`;

export const OptionIconGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const IconCircle = styled.View<{ bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${(props) => props.bgColor};
  align-items: center;
  justify-content: center;
`;

export const OptionLabel = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textTitle};
`;

export const DividerHorizontal = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.border};
  margin-left: 24px;
  margin-right: 24px;
`;
