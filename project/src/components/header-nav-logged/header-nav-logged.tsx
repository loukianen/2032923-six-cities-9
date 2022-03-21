import { SyntheticEvent } from 'react';
import {Link} from 'react-router-dom';
import {finishAuthAction} from '../../store/api-actions';
import { AppDispatch } from '../../types/other-types';
import {AppRoute} from '../../const';

function HeaderNavLogged(props: {dispatch: AppDispatch, email: string}): JSX.Element {
  const {dispatch, email} = props;

  function handleClick(e: SyntheticEvent) {
    e.preventDefault();
    dispatch(finishAuthAction);
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to={AppRoute.Favorites}>
            <a className="header__nav-link header__nav-link--profile" href="#profile">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{email}</span>
            </a>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#nav-link" onClick={handleClick}>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavLogged;
