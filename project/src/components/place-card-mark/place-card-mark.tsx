import cn from 'classnames';
import {PlaceCardType} from '../../types/other-types';

function PlaceCardMark(props: { type: PlaceCardType }) {
  const {type} = props;
  const isTypeRoom = type === 'room';

  const markClassName = cn ({
    'place-card__mark': !isTypeRoom,
    'property__mark': isTypeRoom,
  });

  return (
    <div className={markClassName} data-type={type} data-testid="place-card-mark">
      <span>Premium</span>
    </div>
  );
}

export default PlaceCardMark;
