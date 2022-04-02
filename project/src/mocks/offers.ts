import {datatype, internet, lorem} from 'faker';
import {getRandomValue} from '../services/utils';
import {AccommodationType, Offer } from '../types/offers';
import {accommodationsList, cityNames} from '../const';

const OFFER_AMOUNT = 3;

const makeFakeOffers = (amount = OFFER_AMOUNT, cityName?: string): Offer[] => Array.from(
  Array(amount),
  () => ({
    bedrooms: datatype.number(),
    city: {
      location: {
        latitude: datatype.float(),
        longitude: datatype.float(),
        zoom: datatype.number(),
      },
      name: cityName || getRandomValue(cityNames) as string,
    },
    description: lorem.sentence(),
    goods: Array.from(Array(OFFER_AMOUNT), () => lorem.word()),
    host:{
      avatarUrl: internet.avatar(),
      id: datatype.number(),
      isPro: datatype.boolean(),
      name: internet.userName(),
    },
    id: datatype.number(),
    images: Array.from(Array(6), () => internet.avatar()),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    location: {
      latitude: datatype.float(),
      longitude: datatype.float(),
      zoom: datatype.number(),
    },
    maxAdults: datatype.number(),
    previewImage: internet.avatar(),
    price: datatype.number(),
    rating: datatype.float(),
    title: lorem.sentence(),
    type: getRandomValue(accommodationsList) as AccommodationType,
  }));

export default makeFakeOffers;
