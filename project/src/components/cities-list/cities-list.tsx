import {memo} from 'react';
import cn from 'classnames';
import {setCityName} from '../../store/reducers/city-reducer';
import {cityNames} from '../../const';
import { Dispatch } from '@reduxjs/toolkit';

function CityList(props: {city: string, dispatch: Dispatch}) {
  const {city, dispatch} = props;

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

export default memo(CityList, (prevProps, nextProps) => prevProps.city === nextProps.city);
