import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      {/* <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={{
            uri: 'http://links.papareact.com/gzs',
          }}
        />
      </View> */}

      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        placeholder="where from?"
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        onPress={(data, details = null) => {}}
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
      {/* <NavOptions /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
  },
});
