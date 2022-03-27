import favoritesProcess, {setFavorites, removeFavoriteOffer} from './favorites-process';
import {getRandomArrayIndex} from '../../services/utils';
import makeFakeOffers from '../../mocks/offers';
import {Offer} from '../../types/offers';

describe('Reducer: favoritesProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoritesProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual([]);
  });

  it('should update favorites by set favorites', () => {
    const state = [] as Offer[];
    const favorites = makeFakeOffers();

    expect(favoritesProcess.reducer(state, setFavorites(favorites)))
      .toEqual(favorites);
  });

  it('should update favorites by remove favorite offer', () => {
    const FAVORITE_AMOUNT = 3;
    const state = makeFakeOffers(FAVORITE_AMOUNT);
    const offerIndexToRemove = getRandomArrayIndex(state);
    const restOffers = [...state.slice(0, offerIndexToRemove), ...state.slice(offerIndexToRemove + 1)];

    expect(favoritesProcess.reducer(state, removeFavoriteOffer(state[offerIndexToRemove])))
      .toEqual(restOffers);
  });
});
