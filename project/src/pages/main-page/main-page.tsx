import {useState, useCallback} from 'react';
import Header from '../../components/header/header';
import CityList from '../../components/cities-list/cities-list';
import MainPageContent from '../../components/main-page-content/main-page-content';
import MainPageEmpty from '../../components/main-page-empty/main-page-empty';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState(null as number | null);
  const memoSetActiveOffer = useCallback(() => setActiveOffer, [setActiveOffer]);

  const dispatch = useAppDispatch();
  const { city, offers } = useAppSelector((state) => ({
    city: state.city,
    offers: state.offers,
  }));

  const sortedByCityOffers = offers.filter((item) => item.city.name === city);
  const isOffersListEmpty = sortedByCityOffers.length === 0;
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index${isOffersListEmpty && ' page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList />
        </div>
        <div className="cities">
          {isOffersListEmpty
            ? <MainPageEmpty />
            : <MainPageContent city={city} setActiveOffer={memoSetActiveOffer} offers={sortedByCityOffers} points={points} selectedPoint={activeOffer} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
