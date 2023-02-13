import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { AccountNavigator } from './AccountNavigator';
import { ReportNavigator } from './ReportsNavigation';
import { MapNavigator } from './mapNavigator';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    screenOptions={{
      activeTintColor: colors.brand.primary,
      inactiveTintColor: colors.brand.muted,
    }}>
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Ionicons name="shield" size={size} color={color} />,
      }}
      name="Reports"
      component={ReportNavigator}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
      }}
      name="Map"
      component={MapNavigator}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
      }}
      name="Settings"
      component={AccountNavigator}
    />
  </Tab.Navigator>
);
{
  /* <Tab.Screen
options={{
  headerShown: false,
  tabBarIcon: ({ color, size }) => <Ionicons name="shield" size={size} color={color} />,
}}
name="Reports"
component={ReportNavigator}
/>
<Tab.Screen
options={{
  headerShown: false,
  tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
}}
name="Map"
component={MapNavigator}
/>
<Tab.Screen
options={{
  headerShown: false,
  tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
}}
name="Settings"
component={AccountNavigator}
/> */
}
