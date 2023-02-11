import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../state/slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';
import { useStorageData } from '../hooks/fetchAsyncStorage';
import { Button } from 'react-native-paper';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useStorageData();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw` border-gray-200 flex-shrink `}>
        {/* <View style={{ flexDirection: 'row', display: 'flex' }}>
          <Button
            onPress={() => navigation.navigate('HomeScreen')}
            icon="reply-all"
            style={tw`flex flex-row bg-gray-400 w-28 px-2 py-1 rounded-full `}
            color="black"
            mode="contained">
            back
          </Button>
          <Button
            icon="camera"
            style={tw`flex flex-row bg-gray-400 w-28 px-2 py-1 rounded-full `}
            color="black"
            mode="contained"
            onPress={() => navigation.navigate('OptionsCard')}>
            Forwards
          </Button>
        </View> */}
        <NavFavorites size={'70%'} />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 0,
    overflow: 'scroll',
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 10,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
