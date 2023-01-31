import {
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../../assets/our-voice-logo.png';
import CustomInput from '../../components/auth/CustomInput';
import CustomButton from '../../components/auth/CustomButton';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { login, register } from '../../api';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useStorageData } from '../../hooks/fetchAsyncStorage';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { setItem, removeItem } = useAsyncStorage('User');

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
  };

  const onSignInPress = async () => {
    console.log(email, password);
    const res = await login({ email, password });

    if (res.status === 201) {
      try {
        const jsonValue = JSON.stringify(res.data);
        writeItemToStorage(jsonValue);
        navigation.navigate('HomeScreen');
      } catch (e) {
        console.error('not stored');
        // saving error
      }
    }
  };
  const OnForgotPasswordPress = () => {
    console.warn('forgotPassword');
  };
  const OnSignInFacebook = () => {
    console.warn('signInFacebook');
  };

  const OnSignInApple = () => {
    console.warn('signInApple');
  };

  const OnSignInGoogle = () => {
    console.warn('signInGoogle');
  };
  const onSignUp = () => {
    // const res = register({ email, password });
    console.warn('signUp');
  };

  return (
    <ScrollView>
      <SafeAreaView style={(styles.container, { height, alignItems: 'center' })}>
        <Image style={[styles.logo, { height: height * 0.3 }]} source={Logo} resizeMode="contain" />
        <CustomInput value={email} setValue={setEmail} placeholder="Email" />
        <CustomInput
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
          placeholder="password"
        />
        <CustomButton text="Sign In" onPress={onSignInPress} />
        <CustomButton text="Forgot Password?" onPress={OnForgotPasswordPress} type="TERTIARY" />
        <CustomButton
          text="Sign In with Google"
          onPress={OnSignInGoogle}
          type="TERTIARY"
          bgColor="#e3e3e3"
          txColor="#363636"
        />
        <View style={tw` flex-row p-1 justify-between `}>
          <CustomButton
            text="Sign In with Facebook"
            onPress={OnSignInFacebook}
            type="TERTIARY"
            bgColor="#EFEAF4"
            txColor="#4765A9"
          />
          <CustomButton
            text="Sign In with Apple"
            onPress={OnSignInApple}
            type="TERTIARY"
            bgColor="#FAE9EA"
            txColor="#DD4D44"
          />
        </View>

        <CustomButton
          text="Dont have an account? please Sign up"
          onPress={onSignUp}
          type="TERTIARY"
        />
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FBFC',
  },
  logo: {
    width: '80%',
    maxWidth: 200,
    maxHeight: 200,
  },
});
export default SignInScreen;
