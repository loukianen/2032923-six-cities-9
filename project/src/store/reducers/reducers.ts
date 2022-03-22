import {combineReducers} from 'redux';
import offers from './offers-reducer';
import authorizationStatus from './auth-status';
import user from './user-reducer';
import room from './room-reducer';
import offersNearby from './offers-nearby-reducer';
import comments from './comments-reducer';
import favorites from './favorites-reducer';
import {NameSpace} from '../../const';

const reducer = combineReducers({
  [NameSpace.auth]: authorizationStatus.reducer,
  [NameSpace.comments]: comments.reducer,
  [NameSpace.favorites]: favorites.reducer,
  [NameSpace.offers]: offers.reducer,
  [NameSpace.offersNearby]: offersNearby.reducer,
  [NameSpace.room]: room.reducer,
  [NameSpace.user]: user.reducer,
});

export default reducer;
