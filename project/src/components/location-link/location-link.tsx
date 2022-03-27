import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function LocationLink(props: {cityName: string}) {
  const {cityName} = props;

  return (
    <Link to={`${AppRoute.Root}${cityName}`}>
      <div className="locations__item-link">
        <span>{cityName}</span>
      </div>
    </Link>
  );
}

export default LocationLink;
