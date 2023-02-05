import { FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { theme } from '../../../theme';

export const ReportsList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const OrderButton = styled(Button).attrs({
  color: theme.colors.brand.primary,
})`
  padding: ${theme.space[2]};
  width: 80%;
  align-self: center;
`;
