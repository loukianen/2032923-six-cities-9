import {useLayoutEffect} from 'react';
import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchFavoritesAction} from '../../store/api-actions';
import Header from '../../components/header/header';
import FavoriteLocationsList from '../../components/favorite-locations-list/favotie-locations-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesFooter from '../../components/favorites-footer/favorites-footer';
import {NameSpace} from '../../const';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state[NameSpace.favorites]);
  const isFaviritesEmpty = offers.length === 0;

  useLayoutEffect(() => {
    dispatch(fetchFavoritesAction);
  }, [dispatch]);

  const mainClassName = cn('page__main', 'page__main--favorites', {
    'page__main--favorites-empty': isFaviritesEmpty,
  });

  return (
    <div className="page">
      <Header />
      <main className={mainClassName}>
        <div className="page__favorites-container container">
          {isFaviritesEmpty
            ? <FavoritesEmpty />
            : <FavoriteLocationsList offers={offers} />}
        </div>
      </main>
      <FavoritesFooter />
    </div>
  );
}

export default FavoritesPage;
