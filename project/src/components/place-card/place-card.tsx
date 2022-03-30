import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import PlaceCardMark from '../place-card-mark/place-card-mark';
import Bookmark from '../bookmark/bookmark';
import {PlaceCardProps} from '../../types/other-types';
import {getAccommodationTitle, getRatingStyleData} from '../../services/utils';
import {AppRoute} from '../../const';
import useHover from '../../hooks/use-hover';

const getImageSize = (isFavorite: boolean) => isFavorite
  ? { width: '150', height: '110' }
  : { width: '260', height: '200' };

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

  const {width, height} = getImageSize(isTypeFavorite);

  return (
    <article className={articleClass} ref={hoverRef} data-testid="place-card">
      {isPremium && <PlaceCardMark type="placeCard" />}
      <div className={imgWrapperClass} data-testid="place-card-img-wrapper">
        <img className="place-card__image" src={previewImage} width={width} height={height} alt="Place" />
      </div>
      <div className={infoClass} data-testid="place-card-info">
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
          <Link to={`${AppRoute.Room}${id}`} data-testid="place-card-property-link">{title}</Link>
        </h2>
        <p className="place-card__type">{getAccommodationTitle(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
