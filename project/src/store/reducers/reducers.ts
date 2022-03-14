import {combineReducers} from 'redux';
import city from './city-reducer';
import offers from './offers-reducer';
import authorizationStatus from './auth-status';
import user from './user-reducer';
import room from './room-reducer';
import offersNearby from './offers-nearby-reducer';

const reducer = combineReducers({
  authorizationStatus: authorizationStatus.reducer,
  city: city.reducer,
  offers: offers.reducer,
  user: user.reducer,
  room: room.reducer,
  offersNearby: offersNearby.reducer,
});

export default reducer;
