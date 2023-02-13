import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './AppNavigator';
import SignInScreen from '../screens/Account/SignInScreen';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { AccountNavigator } from './AccountNavigator';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Navigation = () => {
  const { getItem } = useAsyncStorage('Token');
  const user = useSelector((state) => state.user.token);
  const [token, setToken] = useState(false);
  console.log(token);
  useEffect(() => {
    const checkToken = async () => {
      const token = await getItem();
      if (token) {
        console.log('navigator token', token);
        setToken(true);
      }
    };
    checkToken();
  }, []);
  return (
    <NavigationContainer>
      {!token || !user ? <AccountNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};
