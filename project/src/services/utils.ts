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

export function getRandomArrayIndex(arr: Array<unknown>) {
  return getRandomValue(Array(arr.length).fill(0).map((item, i) => item + i)) as number;
}

export function getRandomValue(arr: Array<unknown>) {
  const maxIndex = arr.length - 1;
  const index = Math.round(Math.random() * maxIndex);
  return arr[index];
}

export function getRatingStyleData(rating: number) {
  return Math.round(rating) * 20;
}

export function shufleArray(arr: Array<unknown>) {
  function iter(currentArr: Array<unknown>, result: Array<unknown>) : Array<unknown>{
    if (currentArr.length === 0) {
      return result;
    }
    const randomIndex = getRandomArrayIndex(currentArr);
    const newResult = [...result, currentArr[randomIndex]];
    const rest = [...currentArr.slice(0, randomIndex), ...currentArr.slice(randomIndex + 1)];
    return iter(rest, newResult);
  }
  return iter(arr, []);
}

export const uniqueId = Object.assign(
  (prefix = '') => {
    uniqueId.counter += 1;
    return `${prefix}${uniqueId.counter}`;
  },
  { counter: 0 },
);
