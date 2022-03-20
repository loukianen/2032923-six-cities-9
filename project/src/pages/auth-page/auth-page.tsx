import {SyntheticEvent, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {setCityName} from '../../store/reducers/city-reducer';
import {authAction} from '../../store/api-actions';
import {redirectToRoute} from '../../store/actions';
import {getRandomValue} from '../../services/utils';
import {AppRoute, NameSpace, cityNames} from '../../const';

function AuthPage(): JSX.Element {
  const cityName = getRandomValue(cityNames);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state[NameSpace.auth]);

  function handleClick() {
    dispatch(setCityName(cityName as string));
  }

  useEffect(() => {
    if (authStatus === 'authorized') {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, authStatus]);

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    if (evt.target instanceof HTMLFormElement) {
      const formData = new FormData(evt.target);
      const email = formData.get('email');
      const password = formData.get('password');
      dispatch(authAction({email, password}));
    }
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root}>
                <a className="header__logo-link" href="main.html">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <Link to={AppRoute.Root}>
              <div className="locations__item" onClick={handleClick}>
                <div className="locations__item-link">
                  <span>{cityName as string}</span>
                </div>
              </div>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
