import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import {AppRoute} from '../../const';
import HeaderNavNotLogged from './header-nav-not-logged';

const history = createMemoryHistory();

describe('Component: HeaderNavNotLogged', () => {
  beforeEach(() => {
    history.push('/header');
  });

  it('should navigate to Login if user clik "Sign In"', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<h1>LogIn page</h1>}
          />
          <Route
            path='/header'
            element={<HeaderNavNotLogged />}
          />
        </Routes>
      </HistoryRouter>,
    );

    userEvent.click(screen.getByTestId('header-nav-link-profile'));

    expect(history.location.pathname).toBe(AppRoute.Login);
    expect(screen.getByText('LogIn page')).toBeInTheDocument();
  });
});
