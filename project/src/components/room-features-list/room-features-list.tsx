import {uniqueId} from '../../services/utils';

function RoomFeaturesList(props: { goods: string[] }): JSX.Element {
  const { goods } = props;
  return (
    <ul className="property__inside-list">
      {goods.map((item) => (
        <li key={uniqueId('features')} className="property__inside-item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default RoomFeaturesList;
