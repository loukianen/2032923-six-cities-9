import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import Header from './header';
import makeFakeUser from '../../mocks/user';

const user = makeFakeUser();
const renderHeader = (store: MockStore, history: History) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<h1>Main page</h1>}
          />
          <Route
            path='/header'
            element={<Header />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  describe('should render correctly', () => {
    beforeEach(() => {
      history.push('/header');
    });

    it('HeaderNavLogged if user is authorized', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user,
      }});

      renderHeader(store, history);

      expect(screen.getByTestId('header-nav-logged')).toBeInTheDocument();
      expect(screen.queryByTestId('header-nav-not-logged')).not.toBeInTheDocument();
    });

    it('HeaderNavNotLogged if user is unauthorized', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user,
      }});

      renderHeader(store, history);

      expect(screen.getByTestId('header-nav-not-logged')).toBeInTheDocument();
      expect(screen.queryByTestId('header-nav-logged')).not.toBeInTheDocument();
    });
  });

  describe('should navigate', () => {
    beforeEach(() => {
      history.push('/header');
    });

    it('to main page if user click logo', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user,
      }});

      renderHeader(store, history);

      userEvent.click(screen.getByTestId('header-logo-link'));

      expect(history.location.pathname).toBe('/');
      expect(screen.getByText('Main page')).toBeInTheDocument();
    });
  });
});
