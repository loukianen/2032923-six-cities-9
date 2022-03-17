import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Header from '../../components/header/header';
import RoomGallery from '../../components/room-gallery/room-gallery';
import PlaceCardMark from '../../components/place-card-mark/place-card-mark';
import RoomFeaturesList from '../../components/room-features-list/room-features-list';
import RoomHost from '../../components/room-host/room-host';
import ReviewBlock from '../../components/review-block/review-block';
import Map from '../../components/map/map';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchRoomDataAction} from '../../store/api-actions';
import {getAccommodationTitle, getRatingStyleData} from '../../services/utils';
import {NameSpace} from '../../const';

function RoomPage(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const curLocation = useLocation();
  const {room, offersNearby} = useAppSelector((state) => ({
    room: state[NameSpace.room],
    offersNearby: state[NameSpace.offersNearby],
  }));

  const currentPath = curLocation.pathname;
  const [, , offerId] = currentPath.split('/');

  useEffect(() => {
    if (offerId) {
      dispatch(fetchRoomDataAction(offerId));
    }
  }, [offerId, dispatch]);

  if (!room) {
    return null;
  }

  const cityLocation = room.city.location;
  const points = [...offersNearby, room].map(({ id, location }) => ({ id, location }));

  const {
    images, title, rating, isPremium, type, bedrooms, maxAdults, price, goods, description, host,
  } = room;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <RoomGallery images={images} />
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <PlaceCardMark type="room" />}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${getRatingStyleData(rating)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating.toFixed(1)}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {getAccommodationTitle(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <RoomFeaturesList goods={goods} />
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <RoomHost host={host} />
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewBlock />
            </div>
          </div>
          <Map city={cityLocation} points={points} selectedPoint={Number(offerId)} type="room" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCardList offers={offersNearby} placeCardListType="room" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
