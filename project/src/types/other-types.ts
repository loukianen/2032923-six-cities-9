import store from '../store/store';

export type AppDispatch = typeof store.dispatch;

export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Omit<User, 'email' | 'token'>,
}

export type AuthorizationStatusType = 'authorized' | 'unauthorized';

export type MapType = 'main' | 'room';

export type MarkType = 'placeCard' | 'room';

export type PlaceCardType = 'main' | 'room';

export type PlaceCardListType = PlaceCardType;

export type OffersSortingType = 'none' | 'byPriceUp' | 'byPriceDown' | 'byRatingDown';

export type StateType = ReturnType<typeof store.getState>;

export type InfoMessageType = {
  checkLine: () => void;
  isSpinerRun: boolean;
  spinerLine: string[];
  spinerRun: (id: string) => void;
  spinerStop: (id: string) => void;
  startToastLoading: (id: string) => string;
};

export type User = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: string,
}
