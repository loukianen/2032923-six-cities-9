export type AccommodationType = 'apartment' | 'room' | 'house' | 'hotel';

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type City = {
  location: Location,
  name: string,
}

export type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
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

export type LocationsDataType = {
  cityName: string,
  offers: Offer[],
}

export type Point = Pick<Offer, 'id' | 'location'>;
