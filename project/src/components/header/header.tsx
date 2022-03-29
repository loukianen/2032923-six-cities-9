import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import HeaderNavLogged from '../header-nav-logged/header-nav-logged';
import HeaderNavNotLogged from '../header-nav-not-logged/header-nav-not-logged';
import {getUserDataForHeader} from '../../store/user-process/selectors';
import {AppRoute, AuthorizationStatus} from '../../const';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const {authStatus, email} = useAppSelector(getUserDataForHeader);
  const isAuthorisedUser = authStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link" data-testid="header-logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {isAuthorisedUser ? <HeaderNavLogged dispatch={dispatch} email={email} /> : <HeaderNavNotLogged />}
        </div>
      </div>
    </header>
  );
}

export default Header;
