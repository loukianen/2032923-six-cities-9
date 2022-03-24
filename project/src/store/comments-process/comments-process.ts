import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setRoomData} from '../room-process/room-process';
import {Comment, RoomDataType} from '../../types/offers';
import {NameSpace} from '../../const';

const commentsProcess = createSlice({
  name: NameSpace.Comments,
  initialState: [] as Comment[],
  reducers: {
    setComments: (state, action:PayloadAction<Comment[]>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRoomData, (state, action: PayloadAction<RoomDataType>) => {
        state = action.payload.comments;
        return state;
      });
  },
});

export const { setComments } = commentsProcess.actions;

export default commentsProcess;
