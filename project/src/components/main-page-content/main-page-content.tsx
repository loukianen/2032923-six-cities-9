import {useState} from 'react';
import SortingMenu from '../sorting-menu/sorting-menu';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import {Offer, Location} from '../../types/offers';
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

type MainPageContentProps = {
  city: string,
  setActiveOffer: (x: number | null) => void,
  offers: Offer[],
  points: { id: number, location: Location }[],
  selectedPoint: number | null,
}

function MainPageContent(props: MainPageContentProps): JSX.Element {
  const { city, setActiveOffer, offers, points, selectedPoint } = props;
  const [sortingType, setSortingType] = useState<OffersSortingType>('none');

  const sortedOffers: Offer[] = [...offers].sort(getCompareFunction(sortingType));
  const cityLocation = sortedOffers[0].city.location ?? DEFAULT_LOCATION;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {city}</b>
        <SortingMenu setSortingType={setSortingType} sortingType={sortingType} />
        <PlaceCardList setActiveOffer={setActiveOffer} offers={sortedOffers} placeCardListType="main" />
      </section>
      <div className="cities__right-section">
        <Map city={cityLocation} points={points} selectedPoint={selectedPoint} type="main" />
      </div>
    </div>
  );
}

export default MainPageContent;
