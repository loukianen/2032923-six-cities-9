import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Offer} from '../../types/offers';

const offersReducer = createSlice({
  name: 'offers',
  initialState: [] as Offer[],
  reducers: {
    setOffers: (state, action:PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setOffers } = offersReducer.actions;

export default offersReducer;
