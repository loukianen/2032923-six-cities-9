import {validatePassword} from './auth-page';

describe('Function: validatePassword', () => {
  fit('should return true if password valid and return false is passvord invalid', () => {
    expect(validatePassword('123')).toBeFalsy();
    expect(validatePassword('aZ')).toBeFalsy();
    expect(validatePassword('1a')).toBeTruthy();
    expect(validatePassword('1A')).toBeTruthy();
  });
});
