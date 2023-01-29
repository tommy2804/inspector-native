import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const NavFavorites = () => {
  const requests = [
    {
      id: 1,
      icon: 'home',
      location: 'Home',
      destination: 'Yehudit 9, Ramat Gan',
    },
    {
      id: 2,
      icon: 'briefcase',
      location: 'Work',
      destination: 'Yehudit 9, Ramat Gan',
    },
  ];
  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={tw`border-t border-gray-200`} />}
      renderItem={({ item: { icon, location, destination } }) => (
        <TouchableOpacity style={tw`flex-row p-5 `}>
          <Icon
            name={icon}
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            type="font-awesome"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
