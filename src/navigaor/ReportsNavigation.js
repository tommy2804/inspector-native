import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportDetailScreen from '../screens/reports/ReportDetailScreen';
import ReportsScreen from '../screens/reports/reportsScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export const ReportNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen options={{ headerShown: false }} name="reports" component={ReportsScreen} />
    <Stack.Screen options={{ headerShown: false }} name="report" component={ReportDetailScreen} />
    <Stack.Screen options={{ headerShown: false }} name="mapScreen" component={MapScreen} />
  </Stack.Navigator>
);
