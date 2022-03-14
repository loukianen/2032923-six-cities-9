import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatusType } from '../../types/other-types';

const authorizationStatusReducer = createSlice({
  name: 'authorizationStatus',
  initialState: 'unauthrized' as AuthorizationStatusType,
  reducers: {
    setAuthStatus: (state, action:PayloadAction<AuthorizationStatusType>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setAuthStatus } = authorizationStatusReducer.actions;

export default authorizationStatusReducer;
