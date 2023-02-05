import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../screens/MapScreen';
import ReportDetailScreen from '../screens/reports/ReportDetailScreen';
import ReportScreen from '../screens/reports/reportsScreen';
import SignInScreen from '../screens/signup/SignInScreen';
import HomeScreen from '../screens/HomeScreen';

const TAB_ICON = {
  Restaurants: 'restaurant',
  shield: 'shield',
  Map: 'map',
  Settings: 'settings',
};

const Tab = createBottomTabNavigator();
const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
  };
};

export const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    screenOptions={createScreenOptions}
    tabBarOptions={{
      activeTintColor: colors.brand.primary,
      inactiveTintColor: colors.brand.muted,
    }}>
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
      }}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="shield" size={size} color={color} />,
      }}
      name="Reports"
      component={ReportScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
      }}
      name="Map"
      component={MapScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
      }}
      name="Settings"
      component={SignInScreen}
    />
  </Tab.Navigator>
);
