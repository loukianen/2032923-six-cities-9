import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Comment} from '../../types/other-types';

const commentsReducer = createSlice({
  name: 'offers',
  initialState: [] as Comment[],
  reducers: {
    setComments: (state, action:PayloadAction<Comment[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setComments } = commentsReducer.actions;

export default commentsReducer;
