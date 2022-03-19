import FavoritePlaceCard from '../favorite-place-card/favorite-place-card';
import {Offer} from '../../types/offers';

function FavoritePlacesList(props: {offers: Offer[]}) {
  return (
    <div className="favorites__places">
      {props.offers.map((offer) => <FavoritePlaceCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default FavoritePlacesList;
