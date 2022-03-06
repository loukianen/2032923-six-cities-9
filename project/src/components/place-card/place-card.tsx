import { Link } from 'react-router-dom';
import PlaceCardMark from '../place-card-mark/place-card-mark';
import { Offer } from '../../types/offers';
import { PlaceCardType } from '../../types/other-types';
import { getAccommodationTitle, getRatingStyleData } from '../../utils';

function getClassesName(type: PlaceCardType ) {
  const mapping = {
    main: {
      articleClass: 'cities__place-card place-card',
      imgWrapperClass: 'cities__image-wrapper place-card__image-wrapper',
    },
    room: {
      articleClass: 'near-places__card place-card',
      imgWrapperClass: 'near-places__image-wrapper place-card__image-wrapper',
    },
  };
  return mapping[type];
}

type PlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'price' | 'rating' | 'title' | 'type' | 'previewImage' | 'id'>,
  placeCardType: PlaceCardType,
  setActiveOffer?: (x: number | null) => void,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {
    placeCardType,
    setActiveOffer,
    offer: { isPremium, price, rating, title, type, id, previewImage },
  } = props;

  const handleMouseEnter = (offerId: number) => () => {
    if (setActiveOffer) {
      setActiveOffer(offerId);
    }
  };

  const handleMouseLeave = () => {
    if (setActiveOffer) {
      setActiveOffer(null);
    }
  };

  const { articleClass, imgWrapperClass } = getClassesName(placeCardType);

  return (
    <article className={articleClass} onMouseOver={handleMouseEnter(id)} onMouseLeave={handleMouseLeave}>
      {isPremium && <PlaceCardMark type="placeCard" />}
      <div className={imgWrapperClass}>
        <a href="#place-card">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
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
