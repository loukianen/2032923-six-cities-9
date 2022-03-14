import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import RoomGallery from '../../components/room-gallery/room-gallery';
import PlaceCardMark from '../../components/place-card-mark/place-card-mark';
import RoomFeaturesList from '../../components/room-features-list/room-features-list';
import ReviewBlock from '../../components/review-block/review-block';
import Map from '../../components/map/map';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import {useAppSelector} from '../../hooks/hooks';
import {Offer} from '../../types/offers';
import {AppRoute} from '../../const';
import {getAccommodationTitle, getRatingStyleData} from '../../services/utils';

function getProcessedOffersData(offers: Offer[]) {
  return offers.reduce((acc: { [offerId: string]: Offer}, offer: Offer) => {
    acc[offer.id] = offer;
    return acc;
  }, {});
}

function RoomPage(): JSX.Element | null {
  const navigate = useNavigate();
  const { city, offers } = useAppSelector((state) => state);
  const offersStore = getProcessedOffersData(offers);

  const currentPath = document.location.pathname;
  const [, , offerId] = currentPath.split('/');
  const offer = offersStore[offerId];

  useEffect(() => {
    if (!offer) {
      navigate('/notfound', { replace: true });
    }
  });

  if (!offer) {
    return null;
  }

  const cityLocation = offer.city.location;
  const offersNear = offers.filter(({ city: {name} }) => city === name);
  const points = offersNear.map(({ id, location }) => ({ id, location }));
  const {
    images, title, rating, isPremium, type, bedrooms, maxAdults, price, goods,
  } = offer;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root}>
                <a className="header__logo-link" href="#main">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#sign-out">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    Angelina
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
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
              <PlaceCardList offers={offersNear} placeCardListType="room" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
