import {useParams, Navigate} from 'react-router-dom';
import cn from 'classnames';
import Header from '../../components/header/header';
import CityList from '../../components/cities-list/cities-list';
import MainPageContent from '../../components/main-page-content/main-page-content';
import MainPageEmpty from '../../components/main-page-empty/main-page-empty';
import {useAppSelector} from '../../hooks/hooks';
import {getOffersByCity} from '../../store/offers-process/selectors';
import {AppRoute, cityNames, DEFAULT_CITY} from '../../const';

function MainPage(): JSX.Element {
  const pathParams = useParams();
  const city = pathParams.city ?? DEFAULT_CITY;

  const offers = useAppSelector(getOffersByCity(city));
  const isOffersListEmpty = offers.length === 0;

  const pageClassName = cn('page__main page__main--index', {
    'page__main--index-empty': isOffersListEmpty,
  });
  const contentWrapperClassName = cn('cities__places-container', 'container', {
    'cities__places-container--empty': isOffersListEmpty,
  });

  return cityNames.includes(city) ? (
    <div className="page page--gray page--main">
      <Header />
      <main className={pageClassName} data-testid="main-main">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList city={city} />
        </div>
        <div className="cities">
          <div className={contentWrapperClassName} data-testid="main-page-content-wrapper">
            {isOffersListEmpty ? <MainPageEmpty /> : <MainPageContent city={city} offers={offers} />}
          </div>
        </div>
      </main>
    </div>
  ) : <Navigate to={AppRoute.NotFound} />;
}

export default MainPage;
