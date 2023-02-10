import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportDetailScreen from '../screens/reports/ReportDetailScreen';
import ReportsScreen from '../screens/reports/reportsScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export const ReportNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="reports" component={ReportsScreen} />
    <Stack.Screen name="report" component={ReportDetailScreen} />
    <Stack.Screen name="mapScreen" component={MapScreen} />
  </Stack.Navigator>
);
