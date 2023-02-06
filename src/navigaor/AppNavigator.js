import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../screens/MapScreen';
import ReportDetailScreen from '../screens/reports/ReportDetailScreen';
import ReportScreen from '../screens/reports/reportsScreen';
import { LoginScreen } from '../screens/Account/SignInScreen';
import { AccountScreen } from '../screens/Account/Account';
import HomeScreen from '../screens/HomeScreen';
import { AccountNavigator } from './AccountNavigator';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Feed"
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
      component={AccountNavigator}
    />
  </Tab.Navigator>
);
