import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';
import {NameSpace} from '../../const';

const favoritesProcess = createSlice({
  name: NameSpace.Favorites,
  initialState: [] as Offer[],
  reducers: {
    setFavorites: (state, action:PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
    removeFavoriteOffer: (state, action:PayloadAction<Offer>) => state
      .filter((offer) => offer.id !== action.payload.id),
  },
});

export const {setFavorites, removeFavoriteOffer} = favoritesProcess.actions;

export default favoritesProcess;
