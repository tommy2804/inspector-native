import styled from 'styled-components';
import { View, ActivityIndicator } from 'react-native';

export const LoadingContainer = styled(View)`
  position: absolute;
  top: 50%;
  left: 50%;
`;
export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
