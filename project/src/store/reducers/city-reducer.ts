import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cityReducer = createSlice({
  name: 'city',
  initialState: 'Paris',
  reducers: {
    setCityName: (state, action:PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCityName } = cityReducer.actions;

export default cityReducer;
