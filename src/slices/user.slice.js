import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    fullName: '',
    email: '',
    token: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { id: '', fullName: '', email: '', token: '' };
    },
  },
});

export const { setUser, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
