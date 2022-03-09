import {useState} from 'react';
import CityList from '../../components/cities-list/cities-list';
import MainPageContent from '../../components/main-page-content/main-page-content';
import MainPageEmpty from '../../components/main-page-empty/main-page-empty';
import {useAppSelector} from '../../hooks';
// import {OffersProps} from '../../types/offers';


// type MainPageProps = OffersProps & { city: string };

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState(null as number | null);
  const { city, offers } = useAppSelector((state) => state);
  const sortedByCityOffers = offers.filter((item) => item.city.name === city);
  const isOffersListEmpty = sortedByCityOffers.length === 0;
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="#header__logo">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#header__nav-link">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index${isOffersListEmpty && ' page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList />
        </div>
        <div className="cities">
          {isOffersListEmpty
            ? <MainPageEmpty />
            : <MainPageContent setActiveOffer={setActiveOffer} offers={sortedByCityOffers} points={points} selectedPoint={activeOffer} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
