import { OffersSortingType } from './types/other-types';

export enum APIRoute {
  Comments = '/comments',
  Favorites = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels',
}

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Room = '/offer/:id',
  Root = '/',
}

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const IMG_URL = 'img/';

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const MIN_REVIEW_LENGTH = 50;

export const MAX_STARS_RATING = 5;

export const offersSortingVariants: OffersSortingType[] = ['none', 'byPriceUp', 'byPriceDown', 'byRatingDown'];

export enum Pins {
  Normal = 'pin.svg',
  Active = 'pin-active.svg',
}
