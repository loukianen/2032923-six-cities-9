import {memo} from 'react';
import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';
import {PlaceCardListType} from '../../types/other-types';

const placeCardClassNameMapping = {
  main: 'cities__places-list places__list tabs__content',
  room: 'near-places__list places__list',
};

function getPlaceCardClassName(type: PlaceCardListType ): string {
  return placeCardClassNameMapping[type];
}

type PlaceCardListProps = {
  offers: Offer[],
  setActiveOffer?: (x: number | null) => void,
  placeCardListType: PlaceCardListType,
}

function PlaceCardList(props: PlaceCardListProps) {
  const { offers, placeCardListType } = props;
  return (
    <div className={getPlaceCardClassName(placeCardListType)}>
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
