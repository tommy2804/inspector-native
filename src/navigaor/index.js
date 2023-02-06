import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';
import SignInScreen from '../screens/Account/SignInScreen';
export const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
