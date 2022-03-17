import cn from 'classnames';
import Header from '../../components/header/header';
import CityList from '../../components/cities-list/cities-list';
import MainPageContent from '../../components/main-page-content/main-page-content';
import MainPageEmpty from '../../components/main-page-empty/main-page-empty';
import {useAppSelector} from '../../hooks/hooks';

function MainPage(): JSX.Element {
  const offersCount = useAppSelector((state) => state.offers.length);
  const isOffersListEmpty = offersCount === 0;

  const pageClassName = cn('page__main page__main--index', {
    'page__main--index-empty': isOffersListEmpty,
  });
  const contentWrapperClassName = cn('cities__places-container', 'container', {
    'cities__places-container--empty': isOffersListEmpty,
  });

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={pageClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList />
        </div>
        <div className="cities">
          <div className={contentWrapperClassName}>
            {isOffersListEmpty ? <MainPageEmpty /> : <MainPageContent />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
