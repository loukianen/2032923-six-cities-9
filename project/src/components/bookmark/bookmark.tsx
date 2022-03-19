import cn from 'classnames';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import {changeOfferStatusAction} from '../../store/api-actions';
import {redirectToRoute} from '../../store/actions';
import {PlaceCardType} from '../../types/other-types';
import {AppRoute, NameSpace} from '../../const';

function Bookmark(props: {hotelId: number, isFavorite: boolean, type: PlaceCardType}): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state[NameSpace.auth]);
  const {hotelId, isFavorite, type} = props;
  const isTypeRoom = type === 'room';

  function toggleStatus() {
    if (authStatus !== 'authorized') {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      const newStatus = !isFavorite;
      dispatch(changeOfferStatusAction(hotelId, newStatus, type));
    }
  }

  const buttonClassName = cn('button', {
    'place-card__bookmark-button--active button': isFavorite && !isTypeRoom,
    'property__bookmark-button--active button': isFavorite && isTypeRoom,
    'place-card__bookmark-button': !isTypeRoom,
    'property__bookmark-button': isTypeRoom,
  });

  const svgClassName = cn({
    'place-card__bookmark-icon': !isTypeRoom,
    'property__bookmark-icon': isTypeRoom,
  });

  const width = cn({'18': !isTypeRoom, '31': isTypeRoom});
  const height = cn({'19': !isTypeRoom, '33': isTypeRoom});

  return (
    <button className={buttonClassName} type="button" onClick={toggleStatus}>
      <svg className={svgClassName} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default Bookmark;
