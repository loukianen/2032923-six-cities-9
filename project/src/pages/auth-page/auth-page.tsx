import {SyntheticEvent, useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {authAction} from '../../store/api-actions';
import {redirectToRoute} from '../../store/actions';
import {getAuthStatus} from '../../store/user-process/selectors';
import LocationLink from '../../components/location-link/location-link';
import {getRandomValue} from '../../services/utils';
import {AppRoute, AuthorizationStatus, cityNames} from '../../const';
import {toast} from 'react-toastify';

const passwordWarningText = 'Password should contain minimum one letter and one number';

export const validatePassword = (password: string) => password.match(/[A-Za-z]/) !== null && password.match(/[0-9]/) !== null;

function AuthPage(): JSX.Element {
  const cityName = getRandomValue(cityNames);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useLayoutEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  }, [dispatch, authStatus]);

  function handleFormSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    if (evt.target instanceof HTMLFormElement) {
      const formData = new FormData(evt.target);
      const authData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      validatePassword(authData.password) ? dispatch(authAction(authData)) : toast.warn(passwordWarningText);
    }
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root} className="header__logo-link" data-testid="header-logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title" data-testid="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" title={passwordWarningText} required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <LocationLink cityName={cityName as string} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
