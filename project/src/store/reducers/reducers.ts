import {combineReducers} from 'redux';
import city from './city-reducer';
import offers from './offers-reducer';
import authorizationStatus from './auth-status';
import user from './user-reducer';
import room from './room-reducer';
import offersNearby from './offers-nearby-reducer';
import comments from './comments-reducer';

const reducer = combineReducers({
  authorizationStatus: authorizationStatus.reducer,
  city: city.reducer,
  comments: comments.reducer,
  offers: offers.reducer,
  offersNearby: offersNearby.reducer,
  room: room.reducer,
  user: user.reducer,
});

export default reducer;
