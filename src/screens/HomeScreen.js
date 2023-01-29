import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from '../components/NavFavorites';
import { Icon } from 'react-native-elements';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{
            uri: 'https://www.wikiversity.org/portal/wikiversity.org/assets/img/Wikiversity-logo-tiles_2x.png',
          }}
        />
        <View style={tw`absolute top-3 right-5 z-50 p-3 rounded-full `}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Icon name="user" type="font-awesome" color="black" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        placeholder="where from?"
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              place_id: details.place_id,
              fullAddress: details.formatted_address,
            })
          );
          console.log(details.formatted_address, details.place_id, details.geometry?.location);
          dispatch(setDestination(null));
        }}
        returnKeyType={'search'}
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
      />
      <NavOptions />
      <NavFavorites />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
  },
});
