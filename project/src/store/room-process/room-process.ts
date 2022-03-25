import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RoomStateType, RoomDataType} from '../../types/offers';
import {NameSpace} from '../../const';

const roomProcess = createSlice({
  name: NameSpace.Room,
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

export const {setRoom, setRoomData} = roomProcess.actions;

export default roomProcess;
