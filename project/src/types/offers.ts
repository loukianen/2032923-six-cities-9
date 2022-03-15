export type AccommodationType = 'apartment' | 'room' | 'house' | 'hotel';

export type City = {
  location: Location,
  name: string,
}

export type Comment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Omit<UserType, 'email' | 'token'>,
}

export type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type LocationsDataType = {
  cityName: string,
  offers: Offer[],
}

export type Offer = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: AccommodationType,
}

export type OffersProps = { offers: Offer[] };

export type Point = Pick<Offer, 'id' | 'location'>;

export type RoomDataType = {
  room: RoomStateType,
  offersNearby: Offer[];
  comments: Comment[];
}

export type RoomStateType = Offer | null;

export type UserType = {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string,
  token: string,
}
