import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offers';

function OffersList(props: Offers) {
  const [activeOffer, setActiveOffer] = useState(0);
  const handleMouseOver = (id: number) => () => {
    setActiveOffer(id);
  };
  const handleMouseOut = () => {
    setActiveOffer(0);
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
