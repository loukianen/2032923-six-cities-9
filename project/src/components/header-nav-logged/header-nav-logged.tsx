import { useAppSelector } from '../../hooks/hooks';

function HeaderNavLogged(): JSX.Element {
  const { email } = useAppSelector((state) => state.user);
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="#profile">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
          </a>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#nav-link">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavLogged;
