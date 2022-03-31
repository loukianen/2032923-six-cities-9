import {Link} from 'react-router-dom';
import cn from 'classnames';
import {AppRoute, cityNames} from '../../const';

function CityList(props: {city: string}) {
  const {city} = props;

  return (
    <section className="locations container" data-testid="cities-list">
      <ul className="locations__list tabs__list">
        {cityNames.map((cityName) => {
          const locationClassName = cn('locations__item-link tabs__item', {
            'tabs__item--active': cityName === city,
          });
          return (
            <Link key={cityName} to={`${AppRoute.Root}${cityName}`}>
              <li className="locations__item">
                <div className={locationClassName} data-testid="city-name">
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
