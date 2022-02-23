import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offers';

function OffersList(props: Offers) {
  const { offers } = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} {...offer} />)}
    </div>
  );
}

export default OffersList;
