import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const CenteredContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const ActivityIndicator = styled.ActivityIndicator``;

export const LoadingText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 12px;
  font-weight: 500;
`;

export const Header = styled.View`
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.textTitle};
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
`;

export const CardsContainer = styled.View`
  padding: 0px 24px;
  gap: 16px;
`;

export const Card = styled.View`
  border-radius: 24px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.card};
  padding: 24px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  shadow-color: ${(props) => props.theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.03;
  shadow-radius: 6px;
  elevation: 2;
`;

export const IconWrapper = styled.View`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.secondary};
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.View`
  flex: 1;
`;

export const CardLabel = styled.Text`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const CardValue = styled.Text`
  font-size: 30px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.textTitle};
  margin-top: 2px;
`;

export const CardDesc = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
`;

export const SectionCard = styled.View`
  margin: 24px;
  padding: 24px;
  border-radius: 32px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.card};
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const SectionTitleGroup = styled.View`
  flex: 1;
  padding-right: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textTitle};
`;

export const SectionSubtitle = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 2px;
`;

export const DateBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const DateText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const ChartContainer = styled.View`
  height: 200px;
  position: relative;
`;

export const ChartGridLines = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-between;
  padding-bottom: 24px;
`;

export const GridLine = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.border};
  opacity: 0.6;
`;

export const ChartBars = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 24px;
  z-index: 2;
`;

export const BarWrapper = styled.View`
  align-items: center;
  width: 12%;
`;

export const BarTrack = styled.View`
  height: 130px;
  width: 16px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.secondary};
  justify-content: flex-end;
`;

export const BarFill = styled.View<{ fillHeight: string; isActive?: boolean }>`
  height: ${(props) => props.fillHeight};
  width: 16px;
  border-radius: 8px;
  background-color: ${(props) => (props.isActive ? props.theme.colors.primary : props.theme.colors.tabBarActive)};
`;

export const BarLabel = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 8px;
`;

export const BottomRow = styled.View`
  gap: 0px;
`;

export const DistributionList = styled.View`
  margin-top: 16px;
  gap: 16px;
`;

export const DistItem = styled.View``;

const DistLabelGroupStyled = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 6px;
`;
export { DistLabelGroupStyled as DistLabelGroup };

export const DistLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const DistValue = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const ProgressTrack = styled.View`
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.secondary};
  overflow: hidden;
`;

export const ProgressBar = styled.View<{ fillWidth: string; barColor: string }>`
  height: 8px;
  width: ${(props) => props.fillWidth};
  border-radius: 4px;
  background-color: ${(props) => props.barColor};
`;

export const AchievementList = styled.View`
  margin-top: 16px;
  gap: 16px;
`;

export const AchievementItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 8px 0px;
`;

export const BadgeContainer = styled.View<{ bgColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${(props) => props.bgColor};
  align-items: center;
  justify-content: center;
`;

export const BadgeText = styled.Text`
  font-size: 20px;
`;

export const AchievementContent = styled.View`
  flex: 1;
`;

export const AchievementTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const AchievementDesc = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 2px;
`;
