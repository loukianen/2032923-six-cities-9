import {combineReducers} from 'redux';
import offersProcess from '../offers-process/offers-process';
import room from './room-reducer';
import offersNearby from './offers-nearby-reducer';
import comments from './comments-reducer';
import favoritesProcess from '../favorites-process/favorites-process';
import userProcess from '../user-process/user-process';
import {NameSpace} from '../../const';

const reducer = combineReducers({
  [NameSpace.Comments]: comments.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.OffersNearby]: offersNearby.reducer,
  [NameSpace.Room]: room.reducer,
  [NameSpace.User]: userProcess.reducer,
});

export default reducer;
