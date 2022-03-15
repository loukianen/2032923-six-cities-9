import store from '../store/store';

export type AppDispatch = typeof store.dispatch;

export type AuthDataType = {
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

export type AuthorizationStatusType = 'authorized' | 'unauthorized';

export type MapType = 'main' | 'room';

export type MarkType = 'placeCard' | 'room';

export type OffersSortingType = 'none' | 'byPriceUp' | 'byPriceDown' | 'byRatingDown';

export type PlaceCardType = 'main' | 'room';

export type PlaceCardListType = PlaceCardType;

export type StateType = ReturnType<typeof store.getState>;
