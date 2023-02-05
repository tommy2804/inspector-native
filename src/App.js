import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import ReportDetailScreen from './screens/reports/ReportDetailScreen';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
