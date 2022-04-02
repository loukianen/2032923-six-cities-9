import { AccommodationType } from '../types/offers';
import {MAX_STARS_RATING} from '../const';

const accomodationTitleMapping = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export function getAccommodationTitle(type: AccommodationType) {
  return accomodationTitleMapping[type];
}

export function getRandomArrayIndex(arr: Array<unknown>) {
  return getRandomValue(Array(arr.length).fill(0).map((item, i) => item + i)) as number;
}

export function getRandomValue(arr: Array<unknown>) {
  const maxIndex = arr.length - 1;
  const index = Math.round(Math.random() * maxIndex);
  return arr[index];
}

export function getRatingStyleData(rating: number) {
  return Math.round(rating) * (100 / MAX_STARS_RATING);
}

type Weighted<T> = {item: T, weight: number};
const inflate = <T>(item:T) => ({item, weight: Math.random()});
const compareWeight = <T>(left: Weighted<T>, right: Weighted<T>) => left.weight - right.weight;
const deflate = <T>(weighted: Weighted<T>) => weighted.item;

export const shuffle = <T>(items: T[]) => items.map(inflate).sort(compareWeight).map(deflate);

export const uniqueId = Object.assign(
  (prefix = '') => {
    uniqueId.counter += 1;
    return `${prefix}${uniqueId.counter}`;
  },
  { counter: 0 },
);
