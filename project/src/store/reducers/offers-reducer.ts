import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';
import {NameSpace} from '../../const';

const offersReducer = createSlice({
  name: NameSpace.offers,
  initialState: [] as Offer[],
  reducers: {
    setOffers: (state, action:PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
    replaceOffer: (state, action:PayloadAction<Offer>) => {
      const newOffer = action.payload;
      const newState = state.map((offer) => offer.id === newOffer.id ? newOffer : offer);
      return newState;
    },
  },
});

export const {setOffers, replaceOffer} = offersReducer.actions;

export default offersReducer;
