import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setCityName} from '../../store/reducers/city-reducer';
import {cityNames} from '../../const';

function CityList() {
  const city = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  function handleClick(cityName: string) {
    return () => dispatch(setCityName(cityName));
  }

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityNames.map((cityName) => {
          const locationClassName = cn('locations__item-link tabs__item', {
            'tabs__item--active': cityName === city,
          });
          return (
            <li key={cityName} className="locations__item" onClick={handleClick(cityName)}>
              <a className={locationClassName} href="#locations__item">
                <span>{cityName}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CityList;
