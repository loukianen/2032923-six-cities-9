import FavoritePlaceCard from '../favorite-place-card/favorite-place-card';
import { OffersProps } from '../../types/offers';

function OffersList(props: OffersProps) {
  const { offers } = props;
  return (
    <div className="favorites__places">
      {offers.map((offer) => {
        const { id } = offer;
        return <FavoritePlaceCard key={id} offer={offer} />;
      })}
    </div>
  );
}

export default OffersList;
