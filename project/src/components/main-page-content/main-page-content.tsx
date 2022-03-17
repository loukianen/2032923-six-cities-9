import {useState, useCallback} from 'react';
import SortingMenu from '../sorting-menu/sorting-menu';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks/hooks';
import {Offer} from '../../types/offers';
import {OffersSortingType} from '../../types/other-types';

const DEFAULT_LOCATION = {latitude: 0, longitude: 0, zoom: 0 };

const compareFunctionMapping = {
  none: () => 0,
  byPriceUp: (a: Offer, b: Offer) => {
    if (a.price === b.price) {
      return 0;
    }
    return a.price > b.price ? 1 : -1;
  },
  byPriceDown: (a: Offer, b: Offer) => {
    if (a.price === b.price) {
      return 0;
    }
    return a.price < b.price ? 1 : -1;
  },
  byRatingDown: (a: Offer, b: Offer) => {
    if (a.rating === b.rating) {
      return 0;
    }
    return a.rating > b.rating ? -1 : 1;
  },
};

function getCompareFunction(type: OffersSortingType): (a: Offer, b: Offer) => number {
  return compareFunctionMapping[type];
}

function MainPageContent(): JSX.Element {
  const {city, offers} = useAppSelector((state) => ({
    offers: state.offers,
    city: state.city,
  }));

  const [activeOffer, setActiveOffer] = useState(null as number | null);

  const [sortingType, setSortingType] = useState<OffersSortingType>('none');
  const memoSetSortingType = useCallback(() => setSortingType, [setSortingType]);

  const sortedByCityOffers = offers.filter((item) => item.city.name === city);
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));
  const sortedOffers = [...sortedByCityOffers].sort(getCompareFunction(sortingType));
  const cityLocation = sortedOffers[0].city.location ?? DEFAULT_LOCATION;

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedByCityOffers.length} places to stay in {city}</b>
        <SortingMenu setSortingType={memoSetSortingType} sortingType={sortingType} />
        <PlaceCardList setActiveOffer={setActiveOffer} offers={sortedOffers} placeCardListType="main" />
      </section>
      <div className="cities__right-section">
        <Map city={cityLocation} points={points} selectedPoint={activeOffer} type="main" />
      </div>
    </>
  );
}

export default MainPageContent;
