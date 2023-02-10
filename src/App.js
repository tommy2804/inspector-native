import { KeyboardAvoidingView, Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Navigation } from './navigaor';

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
              <Navigation />
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    </QueryClientProvider>
  );
}
