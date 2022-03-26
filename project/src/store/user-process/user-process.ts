import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_USER} from '../../const';
import {UserType} from '../../types/offers';
import {AuthorizationStatus, NameSpace} from '../../const';

const userProcess = createSlice({
  name: NameSpace.User,
  initialState: {
    user: DEFAULT_USER,
    authorizationStatus: AuthorizationStatus.Unknown,
  },
  reducers: {
    successfulAuth: (state, action:PayloadAction<UserType>) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    },
    unSuccessfulAuth: (state) => {
      state.user = DEFAULT_USER;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    },
  },
});

export const {successfulAuth, unSuccessfulAuth} = userProcess.actions;

export default userProcess;
