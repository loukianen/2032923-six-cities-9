import {createSelector} from 'reselect';
import {NameSpace} from '../../const';
import {Offer} from '../../types/offers';
import {State} from '../../types/state';

export const getOffersByCity = (cityName: string) => createSelector(
  [() => cityName, (state: State) => state[NameSpace.Offers]],
  (value: string, offers: Offer[]) => offers.filter((offer) => offer.city.name === value),
);
