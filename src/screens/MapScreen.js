import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import Map from '../features/map/Map';
import NavigateCard from '../components/NavigateCard';
import { CustomButtonSheet } from '../components/buttonSheet';

const MapScreen = () => {
  return (
    <View>
      <View style={tw`h-full`}>
        <Map />
      </View>

      <CustomButtonSheet minPresent="2.5%" middle="40%" maxPresent="55%">
        <View style={tw`h-full`}>
          <NavigateCard />
        </View>
      </CustomButtonSheet>
    </View>
  );
};

export default MapScreen;
