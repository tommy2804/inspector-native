import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: {
    latitude: '',
    longitude: '',
    Address: {},
  },
  destination: { latitude: '', longitude: '', Address: {} },
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        Address: action.payload.Address,
      };
    },
    setDestination: (state, action) => {
      state.destination = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        Address: action.payload.Address,
      };
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;
