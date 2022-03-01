import FavoriteLocation from '../favorite-location/favorite-location';
import { OffersProps, Offer, Offers } from '../../types/offers';

function FavoriteLocationsList(props: OffersProps) {
  const { offers } = props;
  const sortedOffers = offers.reduce((acc: { [cityName: string]: Offers}, offer: Offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});
  const locationsData = Object.keys(sortedOffers).sort()
    .map((cityName: string) => ({ cityName, offers: sortedOffers[cityName]}));
  return (
    <ul className="favorites__list">
      {locationsData.map((location) => (
        <FavoriteLocation key={location.cityName} locationData={location} />
      ))}
    </ul>
  );
}

export default FavoriteLocationsList;