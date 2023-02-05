import { View, StyleSheet } from 'react-native';
import { GOOGLE_MAPS_APIKEY } from '@env';
import styled from 'styled-components/native';
import { theme } from '../../theme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination } from '../../state/slices/navSlice';

const SearchContainer = styled(View)`
  padding: ${theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;
export const Search = () => {
  const dispatch = useDispatch();

  return (
    <SearchContainer>
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        styles={toInputBoxStyles}
        fetchDetails={true}
        enablePoweredByContainer={false}
        returnKeyType={'search'}
        minLength={2}
        icon="map"
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              latitude: details?.geometry?.location?.lat,
              longitude: details?.geometry?.location?.lng,
              Address: {
                street:
                  details?.address_components[1]?.long_name +
                  details?.address_components[0]?.long_name,
                city: details?.address_components[2]?.long_name,
                country: details?.address_components[3]?.long_name,
              },
            })
          );
        }}
      />
    </SearchContainer>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    paddingTop: 5,
    overflow: 'scroll',
  },
  textInput: {
    fontSize: 18,
  },
});
