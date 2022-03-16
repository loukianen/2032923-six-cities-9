import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RoomStateType, RoomDataType} from '../../types/offers';

const roomReducer = createSlice({
  name: 'room',
  initialState: null as RoomStateType,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomStateType>) => {
      state = action.payload;
      return state;
    },
    setRoomData: (state, action: PayloadAction<RoomDataType>) => {
      state = action.payload.room;
      return state;
    },
  },
});

export const { setRoom, setRoomData } = roomReducer.actions;

export default roomReducer;
