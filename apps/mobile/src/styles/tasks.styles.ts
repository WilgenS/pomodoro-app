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

export const LoadingText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 12px;
  font-weight: 500;
`;

export const Header = styled.View`
  padding: 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitleGroup = styled.View`
  flex: 1;
  padding-right: 16px;
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

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background-color: #0f172a;
  padding: 12px 16px;
  border-radius: 14px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 4;
`;

export const AddButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  padding: 0px 24px;
  margin-bottom: 20px;
  gap: 12px;
`;

export const TabButton = styled.TouchableOpacity<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 12px;
  background-color: ${(props) => (props.active ? '#0f172a' : props.theme.colors.secondary)};
`;

export const TabText = styled.Text<{ active?: boolean }>`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => (props.active ? '#ffffff' : props.theme.colors.textMuted)};
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-style: dashed;
  border-color: ${(props) => props.theme.colors.border};
  border-radius: 32px;
  background-color: rgba(248, 250, 252, 0.5);
  padding: 40px 24px;
  margin-top: 40px;
`;

export const IconBox = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 1;
`;

export const EmptyTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  margin-top: 16px;
`;

export const EmptySubtitle = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textMuted};
  text-align: center;
  margin-top: 6px;
  padding: 0px 16px;
`;

export const EmptyButton = styled.TouchableOpacity`
  background-color: #ffffff;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  padding: 12px 24px;
  border-radius: 14px;
  margin-top: 24px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 1;
`;

export const EmptyButtonText = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const TaskCard = styled.View<{ isCompleted?: boolean }>`
  border-radius: 24px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.card};
  padding: 20px;
  margin-bottom: 16px;
  opacity: ${(props) => (props.isCompleted ? 0.65 : 1)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.02;
  shadow-radius: 4px;
  elevation: 1;
`;

export const TaskHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

export const Checkbox = styled.TouchableOpacity`
  padding: 2px;
`;

export const TaskInfo = styled.View`
  flex: 1;
`;

export const TaskTitle = styled.Text<{ isCompleted?: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textTitle};
  text-decoration-line: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
`;

export const TaskDesc = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 4px;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const TaskFooter = styled.View`
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.colors.border};
`;

export const ProgressBarTrack = styled.View`
  flex: 1;
  height: 6px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 3px;
  margin-right: 16px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.View<{ progress: number }>`
  height: 6px;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 3px;
  width: ${(props) => Math.min(100, props.progress)}%;
`;

export const ProgressText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textMuted};
`;

export const TipCard = styled.View`
  margin: 16px 24px 24px 24px;
  padding: 20px;
  border-radius: 24px;
  background-color: #0f172a;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const TipIconBox = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  align-items: center;
  justify-content: center;
`;

export const TipContent = styled.View`
  flex: 1;
`;

export const TipTitle = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  opacity: 0.7;
`;

export const TipText = styled.Text`
  font-size: 13px;
  color: #ffffff;
  margin-top: 2px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const ModalOverlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: ${(props) => props.theme.colors.card};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 32px 24px;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.15;
  shadow-radius: 10px;
  elevation: 20;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const InputLabel = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textMuted};
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const ModalInput = styled.TextInput<{ hasError?: boolean }>`
  height: 52px;
  border-radius: 14px;
  border-width: 1px;
  border-color: ${(props) => (props.hasError ? props.theme.colors.danger : props.theme.colors.border)};
  background-color: ${(props) => props.theme.colors.input};
  color: ${(props) => props.theme.colors.text};
  padding: 0px 16px;
  font-size: 15px;
`;

export const FieldError = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.danger};
  margin-top: 4px;
  font-weight: 500;
`;

export const PomoSelector = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

export const PomoOption = styled.TouchableOpacity<{ selected?: boolean }>`
  flex: 1;
  height: 48px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props) => (props.selected ? '#0f172a' : props.theme.colors.border)};
  background-color: ${(props) => (props.selected ? '#0f172a' : props.theme.colors.input)};
  align-items: center;
  justify-content: center;
`;

export const PomoText = styled.Text<{ selected?: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => (props.selected ? '#ffffff' : props.theme.colors.text)};
`;

export const SaveButton = styled.TouchableOpacity`
  height: 52px;
  border-radius: 14px;
  background-color: #0f172a;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 4;
`;

export const SaveButtonText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
`;
