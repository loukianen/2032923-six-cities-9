export const MIN_REVIEW_LENGTH = 50;

export const MAX_STARS_RATING = 5;

export enum MarkType {
  PlaceCard = 'place-card__mark',
  Room = 'property__mark',
}

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Room = '/offer/:id',
  Root = '/',
}
