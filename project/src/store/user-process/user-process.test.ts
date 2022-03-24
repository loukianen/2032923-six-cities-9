import userProcess, {successfulAuth, unSuccessfulAuth} from './user-process';
import makeFakeUser from '../../mocks/user';
import {DEFAULT_USER} from '../../const';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        user: DEFAULT_USER,
        authorizationStatus: 'unknown',
      });
  });

  it('should update offers by successful authorization', () => {
    const state = {
      user: DEFAULT_USER,
      authorizationStatus: 'unknown',
    };
    const user = makeFakeUser();
    expect(userProcess.reducer(state, successfulAuth(user)))
      .toEqual({
        user: user,
        authorizationStatus: 'authorized',
      });
  });

  it('should update offers by unsuccessful authorization', () => {
    const state = {
      user: makeFakeUser(),
      authorizationStatus: 'unknown',
    };
    expect(userProcess.reducer(state, unSuccessfulAuth()))
      .toEqual({
        user: DEFAULT_USER,
        authorizationStatus: 'unauthorized',
      });
  });
});
