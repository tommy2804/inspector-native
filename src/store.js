import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';
import userSlice from './slices/user.slice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    user: userSlice,
  },
});
