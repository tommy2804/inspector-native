import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';
import SignInScreen from '../screens/signup/SignInScreen';
export const Navigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
