import { createSlice } from '@reduxjs/toolkit';
import { transportMode } from '../types';

const initialState = {
  origin: { latitude: '', longitude: '', Address: {} },
  destination: { latitude: '', longitude: '', Address: {} },
  travelTime: '',
  transportMode: '',
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
    setTravelTime: (state, action) => {
      state.travelTime = action.payload;
    },
    setTransportMode: (state, action) => {
      state.transportMode = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTime, setTransportMode } = navSlice.actions;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTime = (state) => state.nav.travelTime;
export const selectTravelMode = (state) => state.nav.transportMode;

export default navSlice.reducer;
