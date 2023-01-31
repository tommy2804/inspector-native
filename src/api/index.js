import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({ baseURL: 'http://10.0.0.16:4001' });

API.interceptors.request.use(async (req) => {
  // before all the request so that we can send the token back to middlware so he can check the specific

  if (await AsyncStorage.getItem('User')) {
    let jsonValue = await AsyncStorage.getItem('User');
    jsonValue = JSON.parse(jsonValue);
    req.headers.Authorization = `Bearer ${jsonValue.token}`;
  }
  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
