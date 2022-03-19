import cn from 'classnames';
import { MarkType } from '../../types/other-types';

function PlaceCardMark(props: { type: MarkType }) {
  const {type} = props;
  const isTypePlaceCard = type === 'placeCard';
  const isTypeRoom = type === 'room';

  const markClassName = cn ({
    'place-card__mark': isTypePlaceCard,
    'property__mark': isTypeRoom,
  });

  return (
    <div className={markClassName}>
      <span>Premium</span>
    </div>
  );
}

export default PlaceCardMark;
