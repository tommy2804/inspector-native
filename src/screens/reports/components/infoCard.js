import React from 'react';
import { View } from 'react-native';
import { CustomText as Text } from '../../../components/styles/customText';
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
import brokenLight from '../../../../assets/brokenLight.jpeg';

export const ReportsInfoCard = ({ reports = {} }) => {
  const {
    name = 'Broken Light',
    photos = [brokenLight],
    address = '100 some random street',
  } = reports;
  console.log(reports);
  return (
    <RestaurantCard elevation={2}>
      <View>
        <RestaurantCardCover key={name} source={photos[0]} />
      </View>
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <OperationStatus>
            <Text variant="error">urgency: High </Text>
            <Badge size={14} />
          </OperationStatus>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
