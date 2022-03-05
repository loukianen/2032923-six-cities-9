import {useState} from 'react';
import SortingMenu from '../sorting-menu/sorting-menu';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import Map from '../../components/map/map';
import {useAppSelector} from '../../hooks';
import {Offer, Offers, Location} from '../../types/offers';
import {OffersSortingType} from '../../types/other-types';

function getCompareFunction(type: OffersSortingType): (a: Offer, b: Offer) => number {
  const mapping = {
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
  return mapping[type];
}

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
  const [sortingType, setSortingType] = useState<OffersSortingType>('none');

  const sortedOffers = [...offers].sort(getCompareFunction(sortingType));

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {cityName}</b>
        <SortingMenu setSorting={setSortingType} sortingType={sortingType} />
        <PlaceCardList setActiveOffer={setActiveOffer} offers={sortedOffers} placeCardListType="main" />
      </section>
      <div className="cities__right-section">
        <Map city={city} points={points} selectedPoint={selectedPoint} type="main" />
      </div>
    </div>
  );
}

export default MainPageContent;
