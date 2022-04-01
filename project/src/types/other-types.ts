import {Location, Offer, Point} from './offers';

export type AuthDataType = {
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

export type AuthorizationStatusType = 'authorized' | 'unauthorized' | 'unknown';

export type CommentFormDataType = { rating: number | null, comment: string, checkboxesValue: Array<boolean> };

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

export type PlaceCardListProps = {
  offers: Offer[],
  onActiveOffer?: (x: number | null) => void,
  placeCardType: PlaceCardType,
}

export type PlaceCardType = 'favorite' | 'placeCard' | 'placeNearby'| 'room';
