import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: { latitude: '', longitude: '', Address: {} },
  destination: { latitude: '', longitude: '', Address: {} },
  travelTime: '',
  transportMode: '',
  current: { latitude: '', longitude: '' },
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
    setCurrent: (state, action) => {
      state.current = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
  },
});

export const { setOrigin, setDestination, setTravelTime, setTransportMode, setCurrent } =
  navSlice.actions;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTime = (state) => state.nav.travelTime;
export const selectTravelMode = (state) => state.nav.transportMode;
export const selectCurrent = (state) => state.nav.current;

export default navSlice.reducer;
