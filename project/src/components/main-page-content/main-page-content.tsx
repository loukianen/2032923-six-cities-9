import {useState, useMemo} from 'react';
import SortingMenu from '../sorting-menu/sorting-menu';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import {Offer} from '../../types/offers';
import {OffersSortingType} from '../../types/other-types';


const DEFAULT_LOCATION = {latitude: 0, longitude: 0, zoom: 0 };

const compareFunctionMapping = {
  none: () => 0,
  byPriceUp: (a: Offer, b: Offer) => a.price - b.price,
  byPriceDown: (a: Offer, b: Offer) => b.price - a.price,
  byRatingDown: (a: Offer, b: Offer) => b.rating - a.rating,
};

function getCompareFunction(type: OffersSortingType): (a: Offer, b: Offer) => number {
  return compareFunctionMapping[type];
}

function getSortedOffers(offers: Offer[], sortingType: OffersSortingType) {
  const points = offers.map(({ id, location }) => ({ id, location }));
  const sortedOffers = [...offers].sort(getCompareFunction(sortingType));
  const cityLocation = sortedOffers[0].city.location ?? DEFAULT_LOCATION;
  return {sortedOffers, cityLocation, points};
}

function MainPageContent(props: {offers: Offer[], city: string}): JSX.Element {
  const {city, offers} = props;

  const [activeOffer, setActiveOffer] = useState(null as number | null);

  const [sortingType, setSortingType] = useState<OffersSortingType>('none');

  const {sortedOffers, cityLocation, points} = useMemo(
    () => getSortedOffers(offers, sortingType),
    [offers, sortingType],
  );

  return (
    <>
      <section className="cities__places places"  data-testid="main-page-content">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
        <SortingMenu onSortiedType={setSortingType} sortingType={sortingType} />
        <PlaceCardList onActiveOffer={setActiveOffer} offers={sortedOffers} placeCardType="placeCard" />
      </section>
      <div className="cities__right-section">
        <Map city={cityLocation} points={points} selectedPoint={activeOffer} type="main" />
      </div>
    </>
  );
}

export default MainPageContent;
