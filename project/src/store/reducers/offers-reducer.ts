import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers } from '../../types/offers';

const offersReducer = createSlice({
  name: 'offers',
  initialState: [] as Offers,
  reducers: {
    setOffers: (state, action:PayloadAction<Offers>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setOffers } = offersReducer.actions;

export default offersReducer;
