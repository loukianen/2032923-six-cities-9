import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offers';

type OffersListProps = {
  offers: Offers,
  setActiveOffer: (x: number | null) => void,
}

function OffersList(props: OffersListProps) {
  const { offers } = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          setActiveOffer={props.setActiveOffer}
        />
      ))}
    </div>
  );
}

export default OffersList;
