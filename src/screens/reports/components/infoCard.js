import React from 'react';
import { View } from 'react-native';
import {
  RestaurantCard,
  RestaurantCardCover,
  Address,
  Info,
  Section,
  OperationStatus,
  Icon,
} from './reportsStyle';
import { Badge } from 'react-native-paper';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export const ReportsInfoCard = ({ report }) => {
  const navigaiton = useNavigation();

  return (
    <RestaurantCard elevation={2} onPress={() => navigaiton.navigate('report', { report: report })}>
      <View>
        {report?.reqPhoto && (
          <RestaurantCardCover key={report._id} source={{ uri: report.reqPhoto }} />
        )}
      </View>
      <Info>
        <Text variant="label">{report.reqTitle}</Text>
        <Section>
          <OperationStatus>
            <Text variant="error">urgency: {report.urgency}</Text>
            <Badge size={14} style={{ backgroundColor: report.urgency >= 7 ? 'red' : 'yellow' }} />
          </OperationStatus>
        </Section>
        <Address>{report.reqDescription}</Address>
        <Address>{report?.inspectorComment}</Address>
      </Info>
    </RestaurantCard>
  );
};
