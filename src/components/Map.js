import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  // console.log(destination, origin);

  // in the useEffect try to zoom out when to fit both the origin and the detination in the same screen

  useEffect(() => {
    if (!!destination && origin) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.fullAddress}&destinations=${destination.fullAddress}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

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
        latitude: origin?.location?.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {origin && destination && (
        <MapViewDirections
          origin={{ latitude: origin?.location.lat, longitude: origin?.location.lng }}
          destination={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
          title="Origin"
          description={origin?.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          title="Destination"
          description={destination?.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
