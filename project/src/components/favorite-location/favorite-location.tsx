import FavoritPlacesList from '../favorite-places-list/favorite-places-list';
import LocationLink from '../location-link/location-link';
import {LocationsDataType} from '../../types/offers';

function FavoriteLocation(props: { locationData: LocationsDataType }) {
  const {cityName, offers} = props.locationData;

  return (
    <li className="favorites__locations-items" data-testid="favorite-location">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <LocationLink cityName={cityName} />
        </div>
      </div>
      <FavoritPlacesList offers={offers} />
    </li>
  );
}

export default FavoriteLocation;
