import { FlatList, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { Badge, Colors } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addReports, setReport, selectReports } from '../state/slices/reportSlice';
import { setCurrent } from '../state/slices/navSlice';
import { useSelector } from 'react-redux';

const NavFavorites = ({ size = '50%' }) => {
  const { width } = Dimensions.get('window');
  const reports = useSelector(selectReports);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: size,
      }}>
      <FlatList
        data={reports}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <View style={tw`border-t border-gray-200`} />}
        renderItem={({
          item: {
            icon = 'home',
            location,
            reqPhoto,
            reStreetNum,
            reqStreet,
            reqTitle,
            reqDescription,
            urgency,
          },
          item,
        }) => (
          <TouchableOpacity
            style={tw`flex-row p-2`}
            onPress={() =>
              dispatch(setCurrent({ latitude: location?.lat, longitude: location?.lng }))
            }>
            <View style={{ position: 'absolute', top: 5, left: width / 1.2 }}>
              <Badge
                size={12}
                style={{ backgroundColor: urgency > 8 ? 'red' : urgency > 4 ? 'blue' : 'green' }}
              />
            </View>

            <Icon
              name={icon}
              style={tw`mr-4 rounded-full bg-gray-300 p-3`}
              type="font-awesome"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>{`${reqTitle}`}</Text>
              <View style={{ width: width / 1.2 }}>
                <Text style={styles.description}>{`${reqDescription}`}</Text>
              </View>
              <Text style={styles.address}>{`${reqStreet},${reStreetNum}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavorites;

const styles = StyleSheet.create({
  address: {
    color: 'gray',
    fontSize: 12,
    margin: 4,
  },
  description: {
    color: 'gray',
    fontSize: 15,
  },
});
