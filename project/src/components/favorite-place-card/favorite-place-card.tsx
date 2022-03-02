import PlaceCardMark from '../place-card-mark/place-card-mark';
import { Offer } from '../../types/offers';
import { getAccommodationTitle, getRatingStyleData } from '../../utils';

type FavoritePlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'price' | 'rating' | 'title' | 'type' | 'previewImage'>
}

function FavoritePlaceCard(props: FavoritePlaceCardProps): JSX.Element {
  const { isPremium, price, rating, title, type } = props.offer;
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
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
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
