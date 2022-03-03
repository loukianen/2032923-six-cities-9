import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { Offers, Location } from '../../types/offers';

type MainPageContentProps = {
  setActiveOffer: (x: number | null) => void,
  offers: Offers,
  city: Location,
  points: { id: number, location: Location }[],
  selectedPoint: number | null,
}

function MainPageContent(props: MainPageContentProps): JSX.Element {
  const cityName = useAppSelector((state) => state.city);
  const { setActiveOffer, offers, city, points, selectedPoint } = props;
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {cityName}</b>
        <form className="places__sorting" action="#-some-valid-path" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>
        <PlaceCardList setActiveOffer={setActiveOffer} offers={offers} placeCardListType="main" />
      </section>
      <div className="cities__right-section">
        <Map city={city} points={points} selectedPoint={selectedPoint} type="main" />
      </div>
    </div>
  );
}

export default MainPageContent;
