import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setRoomData} from './room-reducer';
import {Comment, RoomDataType} from '../../types/offers';

const commentsReducer = createSlice({
  name: 'offers',
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

export const { setComments } = commentsReducer.actions;

export default commentsReducer;
