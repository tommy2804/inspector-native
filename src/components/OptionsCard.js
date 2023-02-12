import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { setTransportMode } from '../state/slices/navSlice';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import bus from '../../assets/images/bus.jpeg';
import walk from '../../assets/images/walk.png';
import car from '../../assets/images/Car.webp';
import bycicle from '../../assets/images/bycicle.png';

const transport = [
  {
    id: 'WALKING',
    title: 'Walk',
    image: walk,
  },
  {
    id: 'BICYCLING',
    title: 'Byicycle',
    image: bycicle,
  },
  {
    id: 'DRIVING',
    title: 'Car',
    image: car,
  },
  {
    id: 'TRANSIT',
    title: 'Bus',
    image: bus,
  },
];

const OptionsCard = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { height, width } = Dimensions.get('window');

  return (
    <ScrollView style={{ flex: 1, height: height * 1.2, width }}>
      <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('NavigateCard')}
            style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
          <Text style={tw`text-center py-5 text-xl`}>Select a Way</Text>
        </View>
        <FlatList
          data={transport}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && 'bg-gray-200'
              }`}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  background: 'none',
                }}
                source={image}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>Travel Time...</Text>
              </View>
              <Text style={tw`text-xl`}>10 m</Text>
            </TouchableOpacity>
          )}
        />
        <View>
          <TouchableOpacity
            disabled={!selected}
            onPress={() => dispatch(setTransportMode(selected.id))}
            style={tw`bg-black py-3 m-5 ${!selected && 'bg-gray-300'}`}>
            <Text style={styles.Text}>Choose {selected?.title}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OptionsCard;
