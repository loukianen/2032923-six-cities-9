import {Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import FavoriteLocation from './favorite-location';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import makeFakeOffers from '../../mocks/offers';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({[NameSpace.User]: {
  authorizationStatus: AuthorizationStatus.Auth,
}});

describe('Component: FavoriteLocation', () => {
  beforeEach(() => {
    history.push('/favorite');
  });

  it('should navigate to /:city if user click', () => {
    const props = {
      locationData: {
        cityName: 'Amsterdam',
        offers: makeFakeOffers(1),
      },
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.City}
              element={<h1>{`${props.locationData.cityName} page`}</h1>}
            />
            <Route
              path='/favorite'
              element={<FavoriteLocation {...props} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText(props.locationData.cityName));

    expect(history.location.pathname).toBe(`/${props.locationData.cityName}`);
    expect(screen.getByText(`${props.locationData.cityName} page`)).toBeInTheDocument();
  });
});
