import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';

const roomReducer = createSlice({
  name: 'room',
  initialState: null as Offer | null,
  reducers: {
    setRoom: (state, action: PayloadAction<Offer>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRoom } = roomReducer.actions;

export default roomReducer;
