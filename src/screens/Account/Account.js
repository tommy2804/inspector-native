import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
} from './components/accountStyles';
import { Spacer } from '../../components/styles/spacer';
import { useNavigation } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser } from '../../state/slices/userSlice';

export const AccountScreen = () => {
  const { removeItem } = useAsyncStorage('Token');
  const token = useSelector((state) => state?.user?.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const LogOut = () => {
    removeItem();
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigation.navigate('Account');
  };

  return (
    <AccountBackground>
      <AccountCover />
      <LottieView
        key="animation"
        resizeMode="cover"
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
        source={require('../../../assets/animation/lookingReports.json')}
      />

      <Title variant="caption">Voice Tel Aviv</Title>
      <AccountContainer>
        {token ? (
          <>
            <AuthButton icon="lock-open-outline" mode="contained" onPress={LogOut}>
              Log out
            </AuthButton>
          </>
        ) : (
          <>
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => navigation.navigate('Login')}>
              Login
            </AuthButton>
            <Spacer size="large">
              {/* <AuthButton
                icon="email"
                mode="contained"
                onPress={() => navigation.navigate('Register')}>
                Register
              </AuthButton> */}
            </Spacer>
          </>
        )}
      </AccountContainer>
    </AccountBackground>
  );
};
