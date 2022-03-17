import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';

const cityReducer = createSlice({
  name: NameSpace.city,
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
