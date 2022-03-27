import offersNearbyProcess, {setOffersNearby, replaceOfferNearby} from './offers-nearby-process';
import {setRoomData} from '../room-process/room-process';
import {getRandomArrayIndex} from '../../services/utils';
import makeFakeOffers from '../../mocks/offers';
import makeFakeRoomData from '../../mocks/roomData';
import {Offer} from '../../types/offers';

describe('Reducer: offersNearbyProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersNearbyProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'})).toEqual([]);
  });

  it('should update favorites by set offers nearby', () => {
    const state = [] as Offer[];
    const offersNearby = makeFakeOffers();

    expect(offersNearbyProcess.reducer(state, setOffersNearby(offersNearby)))
      .toEqual(offersNearby);
  });

  it('should update favorites by replace offer nearby', () => {
    const FAVORITE_AMOUNT = 3;
    const state = makeFakeOffers(FAVORITE_AMOUNT);
    const offerIndexToReplace = getRandomArrayIndex(state);
    const newOffer = makeFakeOffers(1)[0];
    newOffer.id = state[offerIndexToReplace].id;
    const newState = [...state.slice(0, offerIndexToReplace), newOffer, ...state.slice(offerIndexToReplace + 1)];

    expect(offersNearbyProcess.reducer(state, replaceOfferNearby(newOffer)))
      .toEqual(newState);
  });

  it('should update favorites by set room data', () => {
    const state = [] as Offer[];
    const roomData = makeFakeRoomData();

    expect(offersNearbyProcess.reducer(state, setRoomData(roomData)))
      .toEqual(roomData.offersNearby);
  });
});
