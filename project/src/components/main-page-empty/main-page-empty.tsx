import {useAppSelector} from '../../hooks/hooks';
import {NameSpace} from '../../const';

function MainPageEmpty(): JSX.Element {
  const city = useAppSelector((state) => state[NameSpace.city]);
  return (
    <>
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </>
  );
}

export default MainPageEmpty;
