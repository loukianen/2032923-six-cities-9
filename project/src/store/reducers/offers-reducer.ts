import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setFavorites, removeFavoriteOffer} from './favorites-reducer';
import {Offer} from '../../types/offers';
import {NameSpace} from '../../const';

const setIsFavoriteProperty = (offer: Offer, favorites: Offer[]) => {
  const newOffer = {...offer};
  favorites.forEach((item) => {
    if (item.id === newOffer.id) {
      newOffer.isFavorite = item.isFavorite;
    }
  });
  return newOffer;
};

const offersReducer = createSlice({
  name: NameSpace.Offers,
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
  extraReducers: (builder) => {
    builder
      .addCase(setFavorites, (state, action:PayloadAction<Offer[]>) => {
        const favorites = action.payload;
        const newState = state.map((offer) => setIsFavoriteProperty(offer, favorites));
        return newState;
      })
      .addCase(removeFavoriteOffer, (state, action:PayloadAction<Offer>) => state
        .map((offer) => {
          const newOffer = {...offer};
          if (offer.id === action.payload.id) {
            newOffer.isFavorite = false;
          }
          return newOffer;
        }));
  },
});

export const {setOffers, replaceOffer} = offersReducer.actions;

export default offersReducer;
