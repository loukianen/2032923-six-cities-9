import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';

type RoomStateType = Offer | null;

const roomReducer = createSlice({
  name: 'room',
  initialState: null as RoomStateType,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomStateType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setRoom } = roomReducer.actions;

export default roomReducer;
