import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const ScrollView = styled.ScrollView``;

export const Header = styled.View`
  padding: 24px;
  align-items: center;
`;

export const SparklesBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textMuted};
  text-transform: uppercase;
`;

export const Title = styled.Text`
  font-size: 34px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.textTitle};
  margin-top: 12px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
  text-align: center;
`;

export const TimerContainer = styled.View`
  margin: 16px 24px;
  padding: 40px 24px;
  border-radius: 40px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.card};
  align-items: center;
  shadow-color: ${(props) => props.theme.colors.shadow};
  shadow-offset: 0px 10px;
  shadow-opacity: 0.05;
  shadow-radius: 12px;
  elevation: 4;
`;

export const RingContainer = styled.View`
  width: 260px;
  height: 260px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const TimeLabelGroup = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const TimeText = styled.Text`
  font-size: 56px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.textTitle};
`;

export const ModeBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
`;

export const ModeText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textMuted};
  text-transform: uppercase;
`;

export const ControlsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
  margin-top: 36px;
`;

export const ControlBtn = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.colors.secondary};
  align-items: center;
  justify-content: center;
`;

export const PlayBtn = styled.TouchableOpacity<{ isActive?: boolean }>`
  width: 76px;
  height: 76px;
  border-radius: 28px;
  background-color: ${(props) => (props.isActive ? props.theme.colors.secondary : '#0f172a')};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 4;
`;

export const SectionCard = styled.View`
  margin: 24px;
  padding: 24px;
  border-radius: 32px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.card};
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const SectionSubtitle = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 2px;
  margin-bottom: 20px;
`;

export const PickerContainer = styled.View`
  border-radius: 14px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.input};
  overflow: hidden;
  margin-bottom: 16px;
`;

export const AlertBox = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: rgba(245, 158, 11, 0.1);
  border-width: 1px;
  border-color: rgba(245, 158, 11, 0.15);
  padding: 12px 16px;
  border-radius: 12px;
  margin-top: 16px;
`;

const AlertTextStyled = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: #b45309;
`;
export { AlertTextStyled as AlertText };

export const SelectedTaskInfo = styled.View`
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 16px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const GoalMeta = styled.View`
  flex: 1;
  padding-right: 12px;
`;

export const GoalLabel = styled.Text`
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const GoalTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textTitle};
  margin-top: 2px;
`;

export const GoalProgress = styled.View`
  align-items: flex-end;
`;

export const ProgressValue = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textTitle};
  margin-top: 2px;
`;

export const StrategyCard = styled.View`
  margin: 0px 24px 24px 24px;
  padding: 32px 24px;
  border-radius: 32px;
  background-color: #0f172a;
  align-items: center;
`;

export const StrategyTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
`;

export const StrategyDesc = styled.Text`
  font-size: 13px;
  color: #ffffff;
  opacity: 0.7;
  text-align: center;
  margin-top: 12px;
  line-height: 18px;
`;

export const DotsRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 24px;
  width: 100%;
  padding: 0px 16px;
`;

export const Dot = styled.View<{ active?: boolean }>`
  height: 6px;
  flex: 1;
  border-radius: 3px;
  background-color: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.15)')};
`;

export const DotsLabel = styled.Text`
  font-size: 9px;
  font-weight: 700;
  color: #ffffff;
  opacity: 0.5;
  text-transform: uppercase;
  margin-top: 12px;
  letter-spacing: 1px;
`;
