import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import SignInScreen from './screens/signup/SignInScreen';

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
              <Stack.Navigator>
                {/* <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  headerShown: false,
                }}
              /> */}

                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
