import {memo} from 'react';
import cn from 'classnames';
import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';
import {PlaceCardType} from '../../types/other-types';

type PlaceCardListProps = {
  offers: Offer[],
  setActiveOffer?: (x: number | null) => void,
  placeCardListType: PlaceCardType,
}

function PlaceCardList(props: PlaceCardListProps) {
  const { offers, placeCardListType } = props;
  const isPlaceCard = placeCardListType === 'placeCard';
  const isPlaceNearby = placeCardListType === 'placeNearby';

  const cardClassName = cn('places__list', {
    'cities__places-list': isPlaceCard,
    'tabs__content': isPlaceCard,
    'near-places__list': isPlaceNearby,
  });

  return (
    <div className={cardClassName}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          setActiveOffer={props.setActiveOffer}
          placeCardType={placeCardListType}
        />
      ))}
    </div>
  );
}

export default memo(PlaceCardList, (prevProps, nextProps) => {
  const isOfferIdsEqual = (prevOffers: Offer[], nextOffers: Offer[]) => prevOffers.every(
    (item, index) => item.id === nextOffers[index].id && item.isFavorite === nextOffers[index].isFavorite);
  return isOfferIdsEqual(prevProps.offers, nextProps.offers)
    && prevProps.placeCardListType === nextProps.placeCardListType;
});
