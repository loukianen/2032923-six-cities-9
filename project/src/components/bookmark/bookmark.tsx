import cn from 'classnames';
import {MarkType} from '../../types/other-types';

function Bookmark(props: {hotelId: string, isFavorite: boolean, type: MarkType}): JSX.Element {
  const {hotelId, isFavorite, type} = props;
  const isTypePlaceCard = type === 'placeCard';
  const isTypeFavoriteCard = type === 'favoriteCard';
  const isTypeRoom = type === 'room';

  function toggle() {
    return hotelId;
  }

  const buttonClassName = cn('button', {
    'place-card__bookmark-button--active button': isFavorite,
    'place-card__bookmark-button': isTypePlaceCard || isTypeFavoriteCard,
    'property__bookmark-button': isTypeRoom,
  });

  const svgClassName = cn({
    'place-card__bookmark-icon': isTypePlaceCard || isTypeFavoriteCard,
    'property__bookmark-icon': isTypeRoom,
  });

  const width = cn({'18': isTypePlaceCard || isTypeFavoriteCard, '31': isTypeRoom});
  const height = cn({'19': isTypePlaceCard || isTypeFavoriteCard, '33': isTypeRoom});

  return (
    <button className={buttonClassName} type="button" onClick={toggle}>
      <svg className={svgClassName} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default Bookmark;
