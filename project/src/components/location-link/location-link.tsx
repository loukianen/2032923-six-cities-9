import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/hooks';
import {setCityName} from '../../store/reducers/city-reducer';
import {AppRoute} from '../../const';

function LocationLink(props: {cityName: string }) {
  const dispatch = useAppDispatch();
  const {cityName} = props;

  function handleClick() {
    dispatch(setCityName(cityName));
  }

  return (
    <Link to={AppRoute.Root}>
      <div className="locations__item-link" onClick={handleClick}>
        <span>{cityName}</span>
      </div>
    </Link>
  );
}

export default LocationLink;
