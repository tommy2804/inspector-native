import { configureStore } from '@reduxjs/toolkit';
import navReducer from './state/slices/navSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
