import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import MainPage from './main-page';
import makeFakeOffers from '../../mocks/offers';
import makeFakeUser from '../../mocks/user';

const renderMainPage = (store: MockStore, history: History) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.City}
            element={<MainPage />}
          />
          <Route
            path={AppRoute.NotFound}
            element={<h1>Not found</h1>}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: MainPage', () => {
  it('should render MainPageContent if offers contain Paris data and path "/"', () => {
    history.push(AppRoute.Root);
    const store = mockStore({
      [NameSpace.Offers]: makeFakeOffers(3, 'Paris'),
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    });

    renderMainPage(store, history);

    expect(screen.getByTestId('main-main').getAttribute('class')).not.toContain('page__main--index-empty');
    expect(screen.getByTestId('main-page-content-wrapper').getAttribute('class')).not.toContain('cities__places-container--empty');

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('cities-list')).toBeInTheDocument();

    expect(screen.getByTestId('main-page-content')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page-empty')).not.toBeInTheDocument();
  });

  it('should render MainPageContent if offers contain Amsterdam data and path "/Amsterdam"', () => {
    const cityName = 'Amsterdam';
    history.push(`${AppRoute.Root}${cityName}`);
    const store = mockStore({
      [NameSpace.Offers]: makeFakeOffers(3, cityName),
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    });

    renderMainPage(store, history);

    expect(screen.getByTestId('main-main').getAttribute('class')).not.toContain('page__main--index-empty');
    expect(screen.getByTestId('main-page-content-wrapper').getAttribute('class')).not.toContain('cities__places-container--empty');

    expect(screen.getByTestId('main-page-content')).toBeInTheDocument();
    expect(screen.queryByTestId('main-page-empty')).not.toBeInTheDocument();
  });

  it('should render MainPageEmpty if offers not contain Paris data and path "/"', () => {
    history.push(AppRoute.Root);
    const store = mockStore({
      [NameSpace.Offers]: makeFakeOffers(3, 'Amsterdam'),
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    });

    renderMainPage(store, history);

    expect(screen.getByTestId('main-main').getAttribute('class')).toContain('page__main--index-empty');
    expect(screen.getByTestId('main-page-content-wrapper').getAttribute('class')).toContain('cities__places-container--empty');

    expect(screen.queryByTestId('main-page-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('main-page-empty')).toBeInTheDocument();
  });

  it('should render "Not found" if in path wrong city name', () => {
    history.push(`${AppRoute.Root}unknown_city`);
    const store = mockStore({
      [NameSpace.Offers]: makeFakeOffers(),
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    });

    renderMainPage(store, history);

    expect(history.location.pathname).toBe(AppRoute.NotFound);
    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
