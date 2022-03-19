import cn from 'classnames';
import Header from '../../components/header/header';
import FavoriteLocationsList from '../../components/favorite-locations-list/favotie-locations-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavoritesFooter from '../../components/favorites-footer/favorites-footer';
import { OffersProps } from '../../types/offers';

function FavoritesPage(props: OffersProps): JSX.Element {
  const isFaviritesEmpty = props.offers.length === 0;

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
            : <FavoriteLocationsList offers={props.offers} />}
        </div>
      </main>
      <FavoritesFooter />
    </div>
  );
}

export default FavoritesPage;
