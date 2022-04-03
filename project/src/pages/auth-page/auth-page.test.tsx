import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import AuthPage from './auth-page';

const renderAuthPage = (store: MockStore, history: History) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<h1>Main Page</h1>}
          />
          <Route
            path={AppRoute.City}
            element={<h1>City page</h1>}
          />
          <Route
            path={AppRoute.Login}
            element={<AuthPage />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: AuthPage', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('should render page correctly', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
    }});

    renderAuthPage(store, history);

    expect(screen.getByTestId('header-logo-link')).toBeInTheDocument();
    expect(screen.getByTestId('location-link-city-name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should navigate to main page if authstatus is "authorised"', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
    }});
    store.dispatch = jest.fn();

    renderAuthPage(store, history);

    expect(store.dispatch).toBeCalled();
  });

  it('should navigate to main page if user click at logo', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
    }});

    renderAuthPage(store, history);

    userEvent.click(screen.getByTestId('header-logo-link'));

    expect(history.location.pathname).toBe(AppRoute.Root);
    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });

  it('should navigate to city page if user click at city name', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
    }});

    renderAuthPage(store, history);

    const cityLinkElement = screen.getByTestId('location-link-city-name');
    const cityName = cityLinkElement.textContent;
    userEvent.click(cityLinkElement);

    expect(history.location.pathname).toBe(`${AppRoute.Root}${cityName}`);
    expect(screen.getByText('City page')).toBeInTheDocument();
  });

  it('should dipatch action and clear form if user click submit and password is valide', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
    }});
    store.dispatch = jest.fn();

    renderAuthPage(store, history);

    userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText('Password'), 'a1');

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(store.dispatch).toBeCalled();
  });

  it('should not dipatch action if user click submit and password is not valide', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
    }});
    store.dispatch = jest.fn();

    renderAuthPage(store, history);

    userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
    userEvent.type(screen.getByPlaceholderText('Password'), '123');

    userEvent.click(screen.getByRole('button'));

    expect(store.dispatch).not.toBeCalled();
  });
});
