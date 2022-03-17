import {memo} from 'react';
import cn from 'classnames';
import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';
import {PlaceCardListType} from '../../types/other-types';

type PlaceCardListProps = {
  offers: Offer[],
  setActiveOffer?: (x: number | null) => void,
  placeCardListType: PlaceCardListType,
}

function PlaceCardList(props: PlaceCardListProps) {
  const { offers, placeCardListType } = props;

  const cardClassName = cn('places__list', {
    'cities__places-list': placeCardListType === 'main',
    'tabs__content': placeCardListType === 'main',
    'near-places__list': placeCardListType === 'room',
  });

  return (
    <div className={cardClassName}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          setActiveOffer={props.setActiveOffer}
          placeCardType="main"
        />
      ))}
    </div>
  );
}

export default memo(PlaceCardList, (prevProps, nextProps) => {
  const isOfferIdsEqual = (prevOffers: Offer[], nextOffers: Offer[]) => prevOffers.every(
    (item, index) => item.id === nextOffers[index].id);
  return isOfferIdsEqual(prevProps.offers, nextProps.offers)
    && prevProps.placeCardListType === nextProps.placeCardListType;
});
