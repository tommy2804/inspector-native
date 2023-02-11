import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrent,
  selectDestination,
  selectTravelMode,
  selectTravelTime,
  setTravelTime,
} from '../../state/slices/navSlice';
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectReports } from '../../state/slices/reportSlice';
import { Search } from './search';
import { MapCallout } from './mapOut';
import { useNavigation } from '@react-navigation/native';

const Map = () => {
  const origin = useCurrentLocation();
  const destination = useSelector(selectDestination);
  const transportMode = useSelector(selectTravelMode);
  const reports = useSelector(selectReports);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get('window');
  const [latDelta, setLatDelta] = useState(0);
  const marker = useSelector(selectCurrent);
  const navigate = useNavigation();

  const convertMinToHours = (min) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    dispatch(
      setTravelTime(
        hours > 0 ? `${hours} hr ${Math.round(minutes)} min` : `${Math.round(minutes)} min`
      )
    );
  };
  // a use effect to set the map to the current latitute and longitude
  mapRef.current?.animateToRegion(
    {
      latitude: marker?.latitude,
      longitude: marker?.longitude,
      latitudeDelta: latDelta / 2,
      longitudeDelta: 0.02,
    },
    500,
    {
      edgePadding: {
        top: 150,
        left: 150,
        right: 150,
        bottom: 150,
      },
    }
  );
  // const centerMap = useCallback(() => {
  //   if (origin && reports?.length > 0) {
  //     mapRef.current?.fitToSuppliedMarkers(['origin', 'report'], {
  //       edgePadding: {
  //         top: 150,
  //         left: 150,
  //         right: 150,
  //         bottom: 150,
  //       },
  //     });
  //   }
  // }, [origin, destination]);
  // useEffect(() => {
  //   centerMap();
  // }, [centerMap]);

  return (
    <>
      <Search />
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        mapType="standard"
        zoomEnabled={true}
        // onMapReady={() =>
        //   mapRef.current.fitToSuppliedMarkers(['origin', 'report'], {
        //     edgePadding: {
        //       top: 100,
        //       left: 100,
        //       right: 100,
        //       bottom: 100,
        //     },
        //   })
        // }
        initialRegion={{
          latitude: marker?.latitude,
          longitude: marker?.longitude,
          latitudeDelta: latDelta / 2,
          longitudeDelta: 0.02,
        }}>
        {origin && destination && (
          <MapViewDirections
            origin={{ latitude: origin?.latitude, longitude: origin?.longitude }}
            destination={{
              latitude: destination?.latitude,
              longitude: destination?.longitude,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode={transportMode}
            onStart={(params) => {
              console.log(`Started routing between "${params}" and "${params}"`);
            }}
            onReady={(result) => {
              convertMinToHours(result.duration);
              console.log(`Distance: ${result.distance} km`);
              console.log(`let waypoints = ${JSON.stringify(result.waypointOrder)}`);

              mapRef.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
            onError={(error) => {
              console.log(error);
            }}
          />
        )}
        {origin.longitude && (
          <Marker
            coordinate={{
              latitude: origin?.latitude,
              longitude: origin?.longitude,
            }}
            title="Your Location"
            description={`${origin?.Address.city}, ${origin?.Address?.country}, ${origin?.Address?.street}`}
            identifier="origin">
            <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color="black" />
          </Marker>
        )}
        {destination?.longitude && (
          <Marker
            coordinate={{
              latitude: destination?.latitude,
              longitude: destination?.longitude,
            }}
            title="Your destination"
            description={`${destination?.Address.city}, ${destination?.Address?.country}, ${destination?.Address?.street}`}
            identifier="destination">
            <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color="black" />
          </Marker>
        )}

        {reports.map((report) => (
          <>
            <Marker coordinate={marker}>
              <Callout onPress={() => navigate.navigate('reportDetailed', { report })}>
                <MapCallout report={report} />
              </Callout>
            </Marker>

            <Marker
              coordinate={{
                latitude: report?.location?.lat,
                longitude: report?.location?.lng,
              }}
              title={report.reqTitle}
              identifier="report"
              description={report.reqDescription}>
              <Callout onPress={() => navigate.navigate('reportDetailed', { report })}>
                <MapCallout report={report} />
              </Callout>
            </Marker>
          </>
        ))}
      </MapView>
    </>
  );
};

export default Map;

const styles = StyleSheet.create({});
