import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { login, register } from '../../api';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
  ErrorContainer,
} from './components/accountStyles';
import { Spacer } from '../../components/styles/spacer';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../state/slices/userSlice';
import jwtDecode from 'jwt-decode';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setItem } = useAsyncStorage('Token');
  const { latitude, longitude } = useCurrentLocation();

  const writeItemToStorage = async (newValue) => {
    await setItem(newValue);
  };

  const onSignInPress = async () => {
    console.log(email, password);
    const res = await login({ email, password, location: { lat: latitude, lng: longitude } });

    if (res.status === 201) {
      console.log(res.data);
      try {
        writeItemToStorage(res.data);
        dispatch(setToken(res.data));
        dispatch(setUser(jwtDecode(res.data)));
        navigation.navigate('Reports');
      } catch (e) {
        console.error('not stored');
        // saving error
      }
    }
  };

  return (
    <AccountBackground>
      <AccountCover />
      <Title variant="caption">Voice Tel Aviv</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(userEmail) => setEmail(userEmail)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(userPass) => setPassword(userPass)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton icon="lock-open-outline" mode="contained" onPress={onSignInPress}>
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
    // <ScrollView>
    //   <SafeAreaView style={(styles.container, { height, alignItems: 'center' })}>
    //     <Image style={[styles.logo, { height: height * 0.3 }]} source={Logo} resizeMode="contain" />
    //     <CustomInput value={email} setValue={setEmail} placeholder="Email" />
    //     <CustomInput
    //       secureTextEntry={true}
    //       value={password}
    //       setValue={setPassword}
    //       placeholder="password"
    //     />
    //     <CustomButton text="Sign In" onPress={onSignInPress} />
    //     <CustomButton text="Forgot Password?" onPress={OnForgotPasswordPress} type="TERTIARY" />
    //     <CustomButton
    //       text="Sign In with Google"
    //       onPress={OnSignInGoogle}
    //       type="TERTIARY"
    //       bgColor="#e3e3e3"
    //       txColor="#363636"
    //     />
    //     <View style={tw` flex-row p-1 justify-between `}>
    //       <CustomButton
    //         text="Sign In with Facebook"
    //         onPress={OnSignInFacebook}
    //         type="TERTIARY"
    //         bgColor="#EFEAF4"
    //         txColor="#4765A9"
    //       />
    //       <CustomButton
    //         text="Sign In with Apple"
    //         onPress={OnSignInApple}
    //         type="TERTIARY"
    //         bgColor="#FAE9EA"
    //         txColor="#DD4D44"
    //       />
    //     </View>

    //     <CustomButton
    //       text="Dont have an account? please Sign up"
    //       onPress={onSignUp}
    //       type="TERTIARY"
    //     />
    //   </SafeAreaView>
    // </ScrollView>
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
