import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import {AppRoute} from '../../const';
import LocationLink from './location-link';

const history = createMemoryHistory();

describe('Component: LocationLink', () => {
  beforeEach(() => {
    history.push('/location');
  });

  it('should navigate to Login if user clik "Sign In"', () => {
    const props = {cityName: 'Amsterdam'};
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.City}
            element={<h1>{`${props.cityName} city page`}</h1>}
          />
          <Route
            path='/location'
            element={<LocationLink {...props} />}
          />
        </Routes>
      </HistoryRouter>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe(`${AppRoute.Root}${props.cityName}`);
    expect(screen.getByText(`${props.cityName} city page`)).toBeInTheDocument();
  });
});
