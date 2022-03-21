import FavoriteLocation from '../favorite-location/favorite-location';
import { OffersProps, Offer } from '../../types/offers';

function FavoriteLocationsList(props: OffersProps) {
  const { offers } = props;
  const sortedOffers = offers.reduce((acc: { [cityName: string]: Offer[] }, offer: Offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});
  const locationsData = Object.keys(sortedOffers).sort()
    .map((cityName: string) => ({ cityName, offers: sortedOffers[cityName] }));
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {locationsData.map((location) => (
          <FavoriteLocation key={location.cityName} locationData={location} />
        ))}
      </ul>
    </section>
  );
}

export default FavoriteLocationsList;
