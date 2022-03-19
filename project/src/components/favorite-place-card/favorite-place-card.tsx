import PlaceCardMark from '../place-card-mark/place-card-mark';
import Bookmark from '../bookmark/bookmark';
import { Offer } from '../../types/offers';
import { getAccommodationTitle, getRatingStyleData } from '../../services/utils';

type FavoritePlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'isFavorite' | 'id' | 'price' | 'rating' | 'title' | 'type' | 'previewImage'>
}

function FavoritePlaceCard(props: FavoritePlaceCardProps): JSX.Element {
  const { isPremium, isFavorite, id, price, rating, title, type } = props.offer;
  return (
    <article className="favorites__card place-card">
      {isPremium && <PlaceCardMark type="placeCard" />}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#header__nav">
          <img className="place-card__image" src="img/apartment-small-03.jpg" width="150" height="110" alt="Place" />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark hotelId={id} isFavorite={isFavorite} type="favoriteCard" />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingStyleData(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#place-card">{title}</a>
        </h2>
        <p className="place-card__type">{getAccommodationTitle(type)}</p>
      </div>
    </article>
  );
}

export default FavoritePlaceCard;
