import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: {
    id: '',
    fullName: '',
    city: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = user = {
        id: '',
        fullName: '',
        city: '',
      };
    },
  },
});

export const { setUser, logout, setToken } = userSlice.actions;
export default userSlice.reducer;
