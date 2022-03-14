import {combineReducers} from 'redux';
import city from './city-reducer';
import offers from './offers-reducer';
import authorizationStatus from './auth-status';
import user from './user-reducer';
import room from './room-reducer';

const reducer = combineReducers({
  authorizationStatus: authorizationStatus.reducer,
  city: city.reducer,
  offers: offers.reducer,
  user: user.reducer,
  room: room.reducer,
});

export default reducer;
