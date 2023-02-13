import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
import ReportDetailScreen from '../screens/reports/ReportDetailScreen';

const Stack = createNativeStackNavigator();

export const MapNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="mapScreen"
      component={MapScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="reportDetailed"
      component={ReportDetailScreen}
    />
  </Stack.Navigator>
);
