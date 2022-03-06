import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers } from '../../types/offers';
import offers from '../../mocks/offers';

const offersReducer = createSlice({
  name: 'offers',
  initialState: offers,
  reducers: {
    setOffers: (state, action:PayloadAction<Offers>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setOffers } = offersReducer.actions;

export default offersReducer;
