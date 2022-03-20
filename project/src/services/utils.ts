import { AccommodationType } from '../types/offers';

const accomodationTitleMapping = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export function getAccommodationTitle(type: AccommodationType) {
  return accomodationTitleMapping[type];
}

export function getRandomValue(arr: Array<unknown>) {
  const maxIndex = arr.length - 1;
  const index = Math.round(Math.random() * maxIndex);
  return arr[index];
}

export function getRatingStyleData(rating: number) {
  return Math.round(rating) * 20;
}

export const uniqueId = Object.assign(
  (prefix = '') => {
    uniqueId.counter += 1;
    return `${prefix}${uniqueId.counter}`;
  },
  { counter: 0 },
);
