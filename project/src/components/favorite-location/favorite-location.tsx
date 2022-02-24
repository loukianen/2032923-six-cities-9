import FavoritPlacesList from '../favorite-places-list/favorite-places-list';
import { LocationsDataType } from '../../types/offers';

function FavoriteLocation(props: { locationData: LocationsDataType }) {
  const { cityName, offers } = props.locationData;
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#header__nav">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <FavoritPlacesList offers={offers} />
    </li>
  );
}

export default FavoriteLocation;
