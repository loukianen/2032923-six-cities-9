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
  NotFound = '/notfound',
  Room = '/offer/',
  RoomId = '/offer/:id',
  Root = '/',
  City = '/:city',
}

export const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const DEFAULT_CITY = 'Paris';

export const DEFAULT_ROOM_DATA = {
  comments: [],
  offersNearby: [],
  room: null,
};

export const DEFAULT_USER = {
  avatarUrl: '',
  email: '',
  id: 0,
  isPro: false,
  name: '',
  token: '',
};

export const IMG_URL = 'img/';

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const MAX_STARS_RATING = 5;

export enum NameSpace {
  Auth = 'AUTH',
  City = 'CITY',
  Comments = 'COMMENTS',
  Favorites = 'FAVORITES',
  OffersNearby = 'OFFERS_NEARBY',
  Offers = 'OFFERS',
  Room = 'ROOM',
  User = 'USER',
}

export const offersSortingVariants: OffersSortingType[] = ['none', 'byPriceUp', 'byPriceDown', 'byRatingDown'];

export enum Pins {
  Normal = 'pin.svg',
  Active = 'pin-active.svg',
}

export const REVIEW = {
  MaxCount: 10,
  MinLength: 50,
  MaxLength: 300,
} as const;
