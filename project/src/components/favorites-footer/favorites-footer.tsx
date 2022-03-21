import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function FavoritesFooter(): JSX.Element {
  return (
    <footer className="footer container">
      <Link to={AppRoute.Root}>
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </Link>
    </footer>
  );
}

export default FavoritesFooter;
