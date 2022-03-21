import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';
import {NameSpace} from '../../const';

const favoritesReducer = createSlice({
  name: NameSpace.favorites,
  initialState: [] as Offer[],
  reducers: {
    setFavorites: (state, action:PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
    removeOffer: (state, action:PayloadAction<Offer>) => state
      .filter((offer) => offer.id !== action.payload.id),
  },
});

export const {setFavorites, removeOffer} = favoritesReducer.actions;

export default favoritesReducer;
