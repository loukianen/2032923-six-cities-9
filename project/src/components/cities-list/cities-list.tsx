import {Link, useParams} from 'react-router-dom';
import cn from 'classnames';
import {AppRoute, cityNames, DEFAULT_CITY} from '../../const';

function CityList() {
  const params = useParams();
  const city = params.city ?? DEFAULT_CITY;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityNames.map((cityName) => {
          const locationClassName = cn('locations__item-link tabs__item', {
            'tabs__item--active': cityName === city,
          });
          return (
            <Link key={cityName} to={`${AppRoute.Root}${cityName}`}>
              <li className="locations__item">
                <div className={locationClassName}>
                  <span>{cityName}</span>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}

export default CityList;
