import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import FavoritesPage from './favorites-page';
import makeFakeOffers from '../../mocks/offers';
import makeFakeUser from '../../mocks/user';

const renderFavoritesPage = (store: MockStore, history: History) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Favorites}
            element={<FavoritesPage />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: FavoritesPage', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render FavoritesLocationList if offers not empty', () => {
    const store = mockStore({
      [NameSpace.Favorites]: makeFakeOffers(3, 'Amsterdam'),
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    });

    renderFavoritesPage(store, history);

    expect(screen.getByTestId('favorites-main').getAttribute('class')).not.toContain('page__main--favorites-empty');
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-location-list')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites-empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('favorites-footer')).toBeInTheDocument();
  });

  it('should render FavoritesEmpty if offers empty', () => {
    const store = mockStore({
      [NameSpace.Favorites]: [],
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    });

    renderFavoritesPage(store, history);

    expect(screen.getByTestId('favorites-main').getAttribute('class')).toContain('page__main--favorites-empty');
    expect(screen.queryByTestId('favorites-location-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
  });
});
