import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_USER} from '../../const';
import {UserType} from '../../types/offers';

const userReducer = createSlice({
  name: 'user',
  initialState: DEFAULT_USER,
  reducers: {
    successfulAuth: (state, action:PayloadAction<UserType>) => {
      state = action.payload;
      return state;
    },
    unSuccessfulAuth: () => DEFAULT_USER,
  },
});

export const { successfulAuth, unSuccessfulAuth } = userReducer.actions;

export default userReducer;
