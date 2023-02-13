import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import NavFavorites from './NavFavorites';

const NavigateCard = () => {
  const reports = useSelector((state) => state.report.reports);
  console.log(reports);
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw` border-gray-200 flex-shrink `}>
        <NavFavorites size={'70%'} />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
