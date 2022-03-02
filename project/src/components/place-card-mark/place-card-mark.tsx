import { MarkType } from '../../types/other-types';

function getClassName(type: MarkType ): string {
  const mapping = {
    placeCard: 'place-card__mark',
    room: 'property__mark',
  };
  return mapping[type];
}

function PlaceCardMark(props: { type: MarkType }) {
  return (
    <div className={getClassName(props.type)}>
      <span>Premium</span>
    </div>
  );
}

export default PlaceCardMark;
