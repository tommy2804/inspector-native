import { Image, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { theme } from '../../../theme';

export const RestaurantCard = styled(Card)`
  background-color: ${theme.colors.bg.primary};
  width: 95%;
  align-self: center;
`;

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${theme.space[3]};
  background-color: ${theme.colors.bg.primary};
`;

export const Address = styled(Text)`
  font-size: 16px;
`;

export const Info = styled(View)`
  padding: ${theme.space[3]};
`;

export const Section = styled(View)`
  flex-direction: row;
  align-items: center;
`;
export const OperationStatus = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Icon = styled(Image)`
  width: 15px;
  height: 15px;
`;
export const MapIcon = styled(Image)`
  width: 70px;
  height: 70px;
`;
