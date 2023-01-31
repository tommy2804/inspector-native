import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

const Map = () => {
  const origin = useCurrentLocation();
  // console.log(origin);
  const destination = useSelector(selectDestination);
  console.log(destination);

  const mapRef = useRef(null);
  // console.log(destination, origin);

  // in the useEffect try to zoom out when to fit both the origin and the detination in the same screen
  const centerMap = useCallback(() => {
    if (destination && origin) {
      mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {
          top: 100,
          left: 100,
          right: 100,
          bottom: 100,
        },
      });
    }
  }, [origin, destination]);
  useEffect(() => {
    centerMap();
  }, [centerMap]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1 `}
      mapType="standard"
      initialRegion={{
        latitude: origin?.latitude,
        longitude: origin?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
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
          strokeColor="black"
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
          identifier="origin"
        />
      )}
      {destination?.longitude && (
        <Marker
          coordinate={{
            latitude: destination?.latitude,
            longitude: destination?.longitude,
          }}
          title="Your destination"
          description={`${destination?.Address.city}, ${destination?.Address?.country}, ${destination?.Address?.street}`}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
