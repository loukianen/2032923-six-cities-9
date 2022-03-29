import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import {AppRoute} from '../../const';
import FavoritesFooter from './favorites-footer';

const history = createMemoryHistory();

describe('Component: FavoritesFooter', () => {
  beforeEach(() => {
    history.push('/footer');
  });

  it('should navigate to main page if user click it', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<h1>Main page</h1>}
          />
          <Route
            path='/footer'
            element={<FavoritesFooter />}
          />
        </Routes>
      </HistoryRouter>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe('/');
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
