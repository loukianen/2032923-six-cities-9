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
  [NameSpace.Auth]: authorizationStatus.reducer,
  [NameSpace.Comments]: comments.reducer,
  [NameSpace.Favorites]: favorites.reducer,
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.OffersNearby]: offersNearby.reducer,
  [NameSpace.Room]: room.reducer,
  [NameSpace.User]: user.reducer,
});

export default reducer;
