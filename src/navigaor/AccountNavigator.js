import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Account/SignInScreen';
import { RegisterScreen } from '../screens/Account/RegisterScreen';
import { AccountScreen } from '../screens/Account/Account';
import { AppNavigator } from './AppNavigator';

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen options={{ headerShown: false }} name="Account" component={AccountScreen} />
    <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
    <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
