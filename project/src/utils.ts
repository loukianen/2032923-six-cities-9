import { AccommodationType } from './types/offers';

export function getAccommodationTitle(type: AccommodationType) {
  const mapping = {
    apartment: 'Apartment',
    room: 'Private Room',
    house: 'House',
    hotel: 'Hotel',
  };
  return mapping[type];
}

export function getRatingStyleData(rating: number) {
  return Math.round(rating) * 20;
}
