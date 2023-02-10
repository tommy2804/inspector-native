import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Map from '../features/map/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import OptionsCard from '../components/OptionsCard';
import { CustomButtonSheet } from '../components/buttonSheet';
import ReportDetailScreen from './reports/ReportDetailScreen';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View>
      <View style={tw`h-full`}>
        <Map />
      </View>
      {/*
      <CustomButtonSheet maxPresent={'70%'}>
        <View style={tw`h-full`}>
          <Stack.Navigator>
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OptionsCard"
              component={OptionsCard}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="report"
              component={ReportDetailScreen}
              options={{ headerShown: false }}
            /> 
          </Stack.Navigator>
        </View>
       
      </CustomButtonSheet>
       */}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
