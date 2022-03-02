import { Link } from 'react-router-dom';
import PlaceCardMark from '../place-card-mark/place-card-mark';
import { MarkType } from '../../const';
import { Offer } from '../../types/offers';
import { getAccommodationTitle, getRatingStyleData } from '../../utils';

type PlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'price' | 'rating' | 'title' | 'type' | 'previewImage' | 'id'>,
  setActiveOffer: (x: number | null) => void,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {
    setActiveOffer,
    offer: { isPremium, price, rating, title, type, id },
  } = props;

  const handleMouseOver = (offerId: number) => () => {
    setActiveOffer(offerId);
  };

  return (
    <article className="cities__place-card place-card" onMouseOver={handleMouseOver(id)}>
      {isPremium && <PlaceCardMark type={MarkType.PlaceCard} />}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#place-card">
          <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingStyleData(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{getAccommodationTitle(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
