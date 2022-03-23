import store from '../store/store';
import {UserType} from '../types/offers';
import {AuthorizationStatusType} from '../types/other-types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatusType,
  user: UserType,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
