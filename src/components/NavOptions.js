import { FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../state/slices/navSlice';
import Paper from '../../assets/images/paper.jpeg';
import direction from '../../assets/images/directionLogo.jpeg';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    url: direction,
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'All Requests',
    url: Paper,
    screen: 'ReportsScreen',
  },
];
const NavOptions = () => {
  const navigation = useNavigation();

  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-6 pt-4 bg-gray-200 m-2 h-64 w-44`}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}>
          <View style={tw`${!origin && 'opacity-20'}`}>
            <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={item?.url} />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
