import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { changeOfferStatusAction } from '../../store/api-actions';
import { PlaceCardType } from '../../types/other-types';
import { AppRoute, NameSpace } from '../../const';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

const getWidth = (isRoom: boolean) => isRoom ? '31' : '18';
const getHeight = (isRoom: boolean) => isRoom ? '33' : '19';
const getSvgClassName = (isRoom: boolean) => isRoom ? 'property__bookmark-icon' : 'place-card__bookmark-icon';
const getElementClassName = (isRoom: boolean) => `${isRoom ? 'property__bookmark-button' : 'place-card__bookmark-button'}`;
const getModifier = (className: string, isFavorite: boolean) => `${className} ${isFavorite ? `${className}--active` : ''}`;
const getButtonClassName = (isRoom: boolean, isFavorite: boolean) => `button ${getModifier(getElementClassName(isRoom), isFavorite)}`;

const getViewProps = (isTypeRoom: boolean, isFavorite: boolean) => ({
  buttonClassName: getButtonClassName(isTypeRoom, isFavorite),
  svgClassName: getSvgClassName(isTypeRoom),
  width: getWidth(isTypeRoom),
  height: getHeight(isTypeRoom),
});

function BookmarkContent(props: { svgClassName: string, width: string, height: string }) {
  return (
    <>
      <svg className={props.svgClassName} width={props.width} height={props.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </>
  );
}

function Bookmark(props: { hotelId: number, isFavorite: boolean, type: PlaceCardType }): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state[NameSpace.auth]);
  const { hotelId, isFavorite, type } = props;
  const {
    buttonClassName,
    height,
    svgClassName,
    width,
  } = getViewProps(type === 'room', isFavorite);

  const toggleStatus = useCallback(() => {
    dispatch(changeOfferStatusAction(hotelId, !isFavorite, type));
  }, [hotelId, isFavorite, type, dispatch]);


  const content = <BookmarkContent height={height} svgClassName={svgClassName} width={width} />;
  return authStatus === 'authorized' ?
    (<button className={buttonClassName} type="button" onClick={toggleStatus}>{content}</button>) :
    (<Link className={buttonClassName} to={AppRoute.Login}>{content}</Link>);

}

export default Bookmark;
