import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';

function FavoritePlacesList(props: {offers: Offer[]}) {
  return (
    <div className="favorites__places">
      {props.offers.map((offer) => <PlaceCard key={offer.id} offer={offer} placeCardType='favorite' />)}
    </div>
  );
}

export default FavoritePlacesList;
