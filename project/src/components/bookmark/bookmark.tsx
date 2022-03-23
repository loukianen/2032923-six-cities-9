import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks/hooks';
import {changeOfferStatusAction} from '../../store/api-actions';
import {PlaceCardType} from '../../types/other-types';
import {AppRoute, NameSpace} from '../../const';

const roomButtonSize = {width: 31, height: 33};
const standartButtonSize = {width: 18, height: 19};

const getButtonSize = (isRoom: boolean) => isRoom ? roomButtonSize : standartButtonSize;

const getSvgClassName = (isRoom: boolean) => isRoom ? 'property__bookmark-icon' : 'place-card__bookmark-icon';

const getElementClassName = (isRoom: boolean) => `${isRoom ? 'property__bookmark-button' : 'place-card__bookmark-button'}`;
const getModifier = (className: string, isFavorite: boolean) => `${className} ${isFavorite ? `${className}--active` : ''}`;
const getButtonClassName = (isRoom: boolean, isFavorite: boolean) => `${getModifier(getElementClassName(isRoom), isFavorite)} button`;

function Bookmark(props: {hotelId: number, isFavorite: boolean, type: PlaceCardType}): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state[NameSpace.Auth]);
  const {hotelId, isFavorite, type} = props;
  const isTypeRoom = type === 'room';

  function handleButtonClick() {
    dispatch(changeOfferStatusAction(hotelId, !isFavorite, type));
  }

  const buttonClassName = getButtonClassName(isTypeRoom, isFavorite);
  const svgClassName = getSvgClassName(isTypeRoom);
  const {width, height} = getButtonSize(isTypeRoom);

  function getButtonContent() {
    return (
      <>
        <svg className={svgClassName} width={width} height={height}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">In bookmarks</span>
      </>
    );
  }

  function renderButton() {
    return (
      <button className={buttonClassName} type="button" onClick={handleButtonClick}>
        {getButtonContent()}
      </button>
    );
  }

  function renderLink() {
    return (
      <Link to={AppRoute.Login}>
        <div className={buttonClassName}>
          {getButtonContent()}
        </div>
      </Link>
    );
  }

  return authStatus === 'authorized' ? renderButton() : renderLink();
}

export default Bookmark;
