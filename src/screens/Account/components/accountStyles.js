import { ImageBackground, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { theme } from '../../../theme';
import { CustomText } from '../../../components/styles/customText';

export const AccountBackground = styled(ImageBackground).attrs({
  //   source: require('../../../../assets/images/homepage_bg.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled(View)`
  padding: ${theme.space[4]};
  margin-top: ${theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: theme.colors.brand.primary,
})`
  padding: ${theme.space[2]};
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ErrorContainer = styled(View)`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${theme.space[2]};
  margin-bottom: ${theme.space[2]};
`;
