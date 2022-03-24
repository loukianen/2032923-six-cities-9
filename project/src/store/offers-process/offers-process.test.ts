import offersProcess, {setOffers, replaceOffer} from './offers-process';
import {removeFavoriteOffer} from '../favorites-process/favorites-process';
import {replaceOfferNearby} from '../offers-nearby-process/offers-nearby-process';
import {setRoom} from '../room-process/room-process';
import {getRandomArrayIndex} from '../../services/utils';
import makeFakeOffers from '../../mocks/offers';
import {Offer} from '../../types/offers';

describe('Reducer: offersProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual([]);
  });

  it('should update offers by set offers', () => {
    const state = [] as Offer[];
    const offers = makeFakeOffers();

    expect(offersProcess.reducer(state, setOffers(offers)))
      .toEqual(offers);
  });

  const actions = [replaceOffer, removeFavoriteOffer, replaceOfferNearby, setRoom];

  it.each(actions)('should update offers by %s', (action) => {
    const state = makeFakeOffers();
    const offerIndexToReplace = getRandomArrayIndex(state);
    const newOffer = makeFakeOffers(1)[0];
    newOffer.id = state[offerIndexToReplace].id;
    const newState = [...state.slice(0, offerIndexToReplace), newOffer, ...state.slice(offerIndexToReplace + 1)];

    expect(offersProcess.reducer(state, action(newOffer)))
      .toEqual(newState);
  });
});
