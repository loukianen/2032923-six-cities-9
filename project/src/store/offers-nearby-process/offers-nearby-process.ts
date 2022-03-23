import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setRoomData} from '../room-process/room-process';
import {Offer, RoomDataType} from '../../types/offers';
import {NameSpace} from '../../const';

const offersNearbyReducer = createSlice({
  name: NameSpace.OffersNearby,
  initialState: [] as Offer[],
  reducers: {
    setOffersNearby: (state, action: PayloadAction<Offer[]>) => {
      state = action.payload;
      return state;
    },
    replaceOfferNearby: (state, action:PayloadAction<Offer>) => {
      const newOffer = action.payload;
      const newState = state.map((offer) => offer.id === newOffer.id ? newOffer : offer);
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRoomData, (state, action: PayloadAction<RoomDataType>) => {
        state = action.payload.offersNearby;
        return state;
      });
  },
});

export const {setOffersNearby, replaceOfferNearby} = offersNearbyReducer.actions;

export default offersNearbyReducer;
