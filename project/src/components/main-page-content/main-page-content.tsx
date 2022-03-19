import {useState, useMemo} from 'react';
import SortingMenu from '../sorting-menu/sorting-menu';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks/hooks';
import {Offer} from '../../types/offers';
import {OffersSortingType} from '../../types/other-types';
import {NameSpace} from '../../const';

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

function getRenderData(city: string, offers: Offer[], sortingType: OffersSortingType) {
  const sortedByCityOffers = offers.filter((item) => item.city.name === city);
  const points = sortedByCityOffers.map(({ id, location }) => ({ id, location }));
  const sortedOffers = [...sortedByCityOffers].sort(getCompareFunction(sortingType));
  const cityLocation = sortedOffers[0].city.location ?? DEFAULT_LOCATION;
  return {sortedOffers, cityLocation, points};
}

function MainPageContent(): JSX.Element {
  const {city, offers} = useAppSelector((state) => ({
    offers: state[NameSpace.offers],
    city: state[NameSpace.city],
  }));

  const [activeOffer, setActiveOffer] = useState(null as number | null);

  const [sortingType, setSortingType] = useState<OffersSortingType>('none');

  const {sortedOffers, cityLocation, points} = useMemo(
    () => getRenderData(city, offers, sortingType),
    [city, offers, sortingType],
  );

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
        <SortingMenu setSortingType={setSortingType} sortingType={sortingType} />
        <PlaceCardList setActiveOffer={setActiveOffer} offers={sortedOffers} placeCardListType="placeCard" />
      </section>
      <div className="cities__right-section">
        <Map city={cityLocation} points={points} selectedPoint={activeOffer} type="main" />
      </div>
    </>
  );
}

export default MainPageContent;
