import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import HeaderNavLogged from '../header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../header-nav-not-logged/header-nav-not-logged';
import {AppRoute} from '../../const';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const {authorizationStatus, email} = useAppSelector((state) => ({
    authorizationStatus: state.authorizationStatus,
    email: state.user.email,
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
          {isAuthorisedUser ? <HeaderNavLogged dispatch={dispatch} email={email} /> : <HeaderNavNotLogged />}
        </div>
      </div>
    </header>
  );
}

export default Header;
