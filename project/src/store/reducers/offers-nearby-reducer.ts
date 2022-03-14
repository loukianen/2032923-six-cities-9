import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';

const offersNearbyReducer = createSlice({
  name: 'offersNearby',
  initialState: [] as Offer[],
  reducers: {
    setOffersNearby: (state, action: PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setOffersNearby } = offersNearbyReducer.actions;

export default offersNearbyReducer;
