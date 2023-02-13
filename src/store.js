import { configureStore } from '@reduxjs/toolkit';
import navReducer from './state/slices/navSlice';
import reportReducer from './state/slices/reportSlice';
import userReducer from './state/slices/userSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    report: reportReducer,
    user: userReducer,
  },
});
