import { StyleSheet, useWindowDimensions, View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { setDestination, setOrigin } from '../state/slices/navSlice';
import NavFavorites from '../components/NavFavorites';
import Logo from '../../assets/images/our-voice-logo.png';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { CustomButtonSheet } from '../components/buttonSheet';
import { useStorageData } from '../hooks/fetchAsyncStorage';

const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const location = useCurrentLocation();
  const user = useStorageData();

  return (
    <SafeAreaView style={{ height, backgroundColor: 'white' }}>
      <View style={tw`p-5`}>
        <Image style={{ width: 200, height: 100, resizeMode: 'contain' }} source={Logo} />
      </View>
      {!location?.latitude && (
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
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                Address: {
                  street:
                    details.address_components[1].long_name +
                    details.address_components[0].long_name,
                  city: details.address_components[2].long_name,
                  country: details.address_components[3].short_name,
                },
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
      )}
      <NavOptions />

      <CustomButtonSheet>
        <NavFavorites />
      </CustomButtonSheet>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
