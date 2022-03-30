import store from '../store/store';
import {Location, Offer, Point} from './offers';

export type AppDispatch = typeof store.dispatch;

export type AuthDataType = {
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

export type AuthorizationStatusType = 'authorized' | 'unauthorized' | 'unknown';

export type CommentFormDataType = { rating: number | null, comment: string };

export type MapProps = {
  city: Location;
  points: Point[];
  selectedPoint: number | null;
  type: MapType,
};

export type MapType = 'main' | 'room';

export type OffersSortingType = 'none' | 'byPriceUp' | 'byPriceDown' | 'byRatingDown';

export type PlaceCadrOffer = Pick<Offer, 'isPremium' | 'isFavorite' | 'price' | 'rating' | 'title' | 'type' | 'previewImage' | 'id'>

export type PlaceCardProps = {
  offer: PlaceCadrOffer,
  placeCardType: PlaceCardType,
  onActiveOffer?: (x: number | null) => void,
}

export type PlaceCardType = 'favorite' | 'placeCard' | 'placeNearby'| 'room';

export type StateType = ReturnType<typeof store.getState>;
