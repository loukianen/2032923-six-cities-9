import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function HeaderNavNotLogged(): JSX.Element {

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <Link to={AppRoute.Login}>
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </a>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default HeaderNavNotLogged;
