import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action';
import { AppState } from '../types/other-types';
import offers from '../mocks/offers';

const initialState: AppState = {
  city: 'paris',
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export default reducer;
