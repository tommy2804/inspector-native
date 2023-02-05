import { configureStore } from '@reduxjs/toolkit';
import navReducer from './state/slices/navSlice';
import reportReducer from './state/slices/reportSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    report: reportReducer,
  },
});
