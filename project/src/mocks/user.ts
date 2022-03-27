import {datatype, internet} from 'faker';
import {UserType} from '../types/offers';

const makeFakeUser = (): UserType => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: datatype.string(),
});

export default makeFakeUser;
