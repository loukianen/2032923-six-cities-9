import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getFavorites = (state: State) => state[NameSpace.Favorites];
