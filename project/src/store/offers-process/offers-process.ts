import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeFavoriteOffer} from '../favorites-process/favorites-process';
import {replaceOfferNearby} from '../offers-nearby-process/offers-nearby-process';
import {setRoom} from '../room-process/room-process';
import {Offer, RoomStateType} from '../../types/offers';
import {NameSpace} from '../../const';

const changeOffer = (state: Offer[], action:PayloadAction<Offer>) => {
  const newOffer = action.payload;
  const newState = state.map((offer) => offer.id === newOffer.id ? newOffer : offer);
  return newState;
};

const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState: [] as Offer[],
  reducers: {
    setOffers: (state, action:PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
    replaceOffer: changeOffer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(replaceOfferNearby, changeOffer)
      .addCase(removeFavoriteOffer, changeOffer)
      .addCase(setRoom, (state, action:PayloadAction<RoomStateType>) => {
        const newOffer = action.payload;
        if (newOffer) {
          return state.map((offer) => offer.id === newOffer.id ? newOffer : offer);
        }
        return state;
      });
  },
});

export const {setOffers, replaceOffer} = offersProcess.actions;

export default offersProcess;
