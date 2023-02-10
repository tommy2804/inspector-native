import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';
import SignInScreen from '../screens/Account/SignInScreen';
import { useStorageData } from '../hooks/fetchAsyncStorage';
import { AccountNavigator } from './AccountNavigator';

export const Navigation = () => {
  const user = useStorageData();
  return (
    <NavigationContainer>{!user ? <AccountNavigator /> : <AppNavigator />}</NavigationContainer>
  );
};
