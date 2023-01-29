import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1 `}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Tommy {/*userName*/}</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View style={{ flex: 0 }}>
          <GooglePlacesAutocomplete
            placeholder="Where to? "
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType={'search'}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            onPress={(data, details = null) => {
              console.log(details);
              dispatch(
                setDestination({
                  location: details.geometry?.location,
                  place_id: details.place_id,
                  fullAddress: details.formatted_address,
                })
              );
              console.log(details.formatted_address, details.place_id, details.geometry?.location);
              navigation.navigate('OptionsCard');
            }}
          />
        </View>
        <NavFavorites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 `}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}>
          <Icon name="reply-all" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('OptionsCard')}
          style={tw`flex flex-row bg-black w-28 px-4 py-3 rounded-full justify-between`}>
          <Icon name="caret-down" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Requsets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,

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
