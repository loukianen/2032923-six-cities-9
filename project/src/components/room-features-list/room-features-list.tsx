function RoomFeaturesList(props: { goods: string[] }): JSX.Element {
  const { goods } = props;
  let key = 0;
  return (
    <ul className="property__inside-list">
      {goods.map((item) => {
        key += 1;
        return (
          <li key={key} className="property__inside-item">
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export default RoomFeaturesList;
