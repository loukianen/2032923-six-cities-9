import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offers';
import { PlaceCardListType } from '../../types/other-types';

function getClassName(type: PlaceCardListType ): string {
  const mapping = {
    main: 'cities__places-list places__list tabs__content',
    room: 'near-places__list places__list',
  };
  return mapping[type];
}


type PlaceCardListProps = {
  offers: Offers,
  setActiveOffer?: (x: number | null) => void,
  placeCardListType: PlaceCardListType,
}

function PlaceCardList(props: PlaceCardListProps) {
  const { offers, placeCardListType } = props;
  return (
    <div className={getClassName(placeCardListType)}>
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

export default PlaceCardList;
