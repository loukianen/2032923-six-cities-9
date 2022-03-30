import {memo} from 'react';
import cn from 'classnames';
import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';
import {PlaceCardListProps} from '../../types/other-types';

function PlaceCardList(props: PlaceCardListProps) {
  const { offers, placeCardType } = props;
  const isPlaceCard = placeCardType === 'placeCard';
  const isPlaceNearby = placeCardType === 'placeNearby';

  const placeListClassName = cn('places__list', {
    'cities__places-list': isPlaceCard,
    'tabs__content': isPlaceCard,
    'near-places__list': isPlaceNearby,
  });

  return (
    <div className={placeListClassName} data-testid="place-card-list">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onActiveOffer={props.onActiveOffer}
          placeCardType={placeCardType}
        />
      ))}
    </div>
  );
}

export default memo(PlaceCardList, (prevProps, nextProps) => {
  const isOfferIdsEqual = (prevOffers: Offer[], nextOffers: Offer[]) => prevOffers.every(
    (item, index) => item.id === nextOffers[index].id && item.isFavorite === nextOffers[index].isFavorite);
  return isOfferIdsEqual(prevProps.offers, nextProps.offers)
    && prevProps.placeCardType === nextProps.placeCardType;
});
