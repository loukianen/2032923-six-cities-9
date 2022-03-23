import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getAuthStatus = (state: State) => state[NameSpace.User].authorizationStatus;

export const getUserDataForHeader = (state: State) => ({
  authStatus: state[NameSpace.User].authorizationStatus,
  email: state[NameSpace.User].user.email,
});
