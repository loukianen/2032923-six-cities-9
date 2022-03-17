import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {successfulAuth, unSuccessfulAuth} from './user-reducer';
import {AuthorizationStatusType} from '../../types/other-types';
import {NameSpace} from '../../const';

const authorizationStatusReducer = createSlice({
  name: NameSpace.auth,
  initialState: 'unauthorized' as AuthorizationStatusType,
  reducers: {
    setAuthStatus: (state, action:PayloadAction<AuthorizationStatusType>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(successfulAuth, () => 'authorized')
      .addCase(unSuccessfulAuth, () => 'unauthorized');
  },
});

export const {setAuthStatus} = authorizationStatusReducer.actions;

export default authorizationStatusReducer;
