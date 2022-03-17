import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import HeaderNavLogged from '../header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../header-nav-not-logged/header-nav-not-logged';
import {AppRoute} from '../../const';

function Header(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => ({
    authorizationStatus: state.authorizationStatus,
  }));
  const isAuthorisedUser = authorizationStatus === 'authorized';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root}>
              <a className="header__logo-link" href="#main">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </Link>
          </div>
          {isAuthorisedUser ? <HeaderNavLogged /> : <HeaderNavNotLogged />}
        </div>
      </div>
    </header>
  );
}

export default Header;
