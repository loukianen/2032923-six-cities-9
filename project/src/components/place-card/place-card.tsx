import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import PlaceCardMark from '../place-card-mark/place-card-mark';
import Bookmark from '../bookmark/bookmark';
import {Offer} from '../../types/offers';
import {PlaceCardType} from '../../types/other-types';
import {getAccommodationTitle, getRatingStyleData} from '../../services/utils';
import {AppRoute} from '../../const';
import useHover from '../../hooks/useHover';

type PlaceCardProps = {
  offer: Pick<Offer, 'isPremium' | 'isFavorite' | 'price' | 'rating' | 'title' | 'type' | 'previewImage' | 'id'>,
  placeCardType: PlaceCardType,
  onActiveOffer?: (x: number | null) => void,
}

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const {
    placeCardType,
    onActiveOffer,
    offer: { isPremium, isFavorite, price, rating, title, type, id, previewImage },
  } = props;
  const isTypePlaceCard = placeCardType === 'placeCard';
  const isTypePlaceNearby = placeCardType === 'placeNearby';
  const isTypeFavorite = placeCardType === 'favorite';

  const [hoverRef, isHover] = useHover<HTMLElement>();

  useEffect(() => {
    if (onActiveOffer !== undefined) {
      isHover ? onActiveOffer(id) : onActiveOffer(null);
    }
  }, [id, onActiveOffer, isHover]);

  const articleClass = cn('place-card', {
    'cities__place-card': isTypePlaceCard,
    'near-places__card': isTypePlaceNearby,
    'favorites__card': isTypeFavorite,
  });

  const imgWrapperClass = cn('place-card__image-wrapper', {
    'cities__image-wrapper': isTypePlaceCard,
    'near-places__image-wrapper': isTypePlaceNearby,
    'favorites__image-wrapper': isTypeFavorite,
  });

  const infoClass = cn('place-card__info', {
    'favorites__card-info': isTypeFavorite,
  });

  const width = cn({'260': !isTypeFavorite, '150': isTypeFavorite });
  const height = cn({'200': !isTypeFavorite, '110': isTypeFavorite });

  return (
    <article className={articleClass} ref={hoverRef}>
      {isPremium && <PlaceCardMark type="placeCard" />}
      <div className={imgWrapperClass}>
        <a href="#place-card">
          <img className="place-card__image" src={previewImage} width={width} height={height} alt="Place" />
        </a>
      </div>
      <div className={infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark hotelId={id} isFavorite={isFavorite} type={placeCardType} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingStyleData(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{getAccommodationTitle(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
