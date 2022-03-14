import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_USER} from '../../const';
import {UserType} from '../../types/other-types';

const userReducer = createSlice({
  name: 'user',
  initialState: DEFAULT_USER,
  reducers: {
    setUser: (state, action:PayloadAction<UserType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userReducer.actions;

export default userReducer;
