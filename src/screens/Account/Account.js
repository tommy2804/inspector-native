import React from 'react';
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

export const AccountScreen = () => {
  const navigation = useNavigation();

  return (
    <AccountBackground>
      <AccountCover />

      <LottieView
        key="animation"
        resizeMode="cover"
        autoPlay
        loop
        source={require('../../../assets/animation/lookingReports.json')}
      />

      <Title variant="caption">Voice Tel Aviv</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate('Login')}>
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton icon="email" mode="contained" onPress={() => navigation.navigate('Register')}>
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
