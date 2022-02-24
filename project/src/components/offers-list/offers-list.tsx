import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { OffersProps } from '../../types/offers';

function OffersList(props: OffersProps) {
  const [activeOffer, setActiveOffer] = useState(null as number | null);
  const handleMouseOver = (id: number) => () => {
    setActiveOffer(id);
  };
  const handleMouseOut = () => {
    setActiveOffer(null);
  };
  const { offers } = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {activeOffer}
      {offers.map((offer) => {
        const { id } = offer;
        return (
          <PlaceCard
            key={id}
            offer={offer}
            mouseOverHandler={handleMouseOver(id)}
            mouseOutHandler={handleMouseOut}
          />
        );
      })}
    </div>
  );
}

export default OffersList;
