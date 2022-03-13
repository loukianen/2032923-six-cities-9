import { combineReducers } from 'redux';
import city from './city-reducer';
import offers from './offers-reducer';
import authorizationStatus from './auth-status';
import user from './user-reducer';

const reducer = combineReducers({
  authorizationStatus: authorizationStatus.reducer,
  city: city.reducer,
  offers: offers.reducer,
  user: user.reducer,
});

export default reducer;
