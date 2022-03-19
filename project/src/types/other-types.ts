import store from '../store/store';

export type AppDispatch = typeof store.dispatch;

export type AuthDataType = {
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

export type AuthorizationStatusType = 'authorized' | 'unauthorized' | 'unknown';

export type CommentFormDataType = { rating: number | null, comment: string };

export type MapType = 'main' | 'room';

export type MarkType = 'favorite' | 'placeCard' | 'placeNearby' | 'room';

export type OffersSortingType = 'none' | 'byPriceUp' | 'byPriceDown' | 'byRatingDown';

export type PlaceCardType = 'placeCard' | 'placeNearby'| 'room';

export type PlaceCardListType = PlaceCardType;

export type StateType = ReturnType<typeof store.getState>;
