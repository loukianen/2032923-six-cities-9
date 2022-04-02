import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AppRoute} from '../../const';
import HeaderNavLogged from './header-nav-logged';
import makeFakeUser from '../../mocks/user';
import {AppDispatch} from '../../types/state';

const user = makeFakeUser();
const renderHeaderNavLogged = (store: MockStore, history: History, props: {dispatch: AppDispatch, email: string}) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Favorites}
            element={<h1>Favorites page</h1>}
          />
          <Route
            path='/header'
            element={<HeaderNavLogged {...props} />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HeaderNavLogged', () => {
  beforeEach(() => {
    history.push('/header');
  });

  it('should render user email', () => {
    const store = mockStore();
    const props = {dispatch: store.dispatch, email: user.email};

    renderHeaderNavLogged(store, history, props);

    expect(screen.getByText(user.email)).toBeInTheDocument();
  });

  it('should navigate to Favorites if user clik email', () => {
    const store = mockStore();
    const props = {dispatch: store.dispatch, email: user.email};

    renderHeaderNavLogged(store, history, props);

    userEvent.click(screen.getByTestId('header-nav-link-profile'));

    expect(history.location.pathname).toBe(AppRoute.Favorites);
    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });

  it('should dispatch action when user click "Sign Out"', () => {
    const store = mockStore();
    store.dispatch = jest.fn();
    const props = {dispatch: store.dispatch, email: user.email};

    renderHeaderNavLogged(store, history, props);

    userEvent.click(screen.getByTestId('header-signout-link'));

    expect(store.dispatch).toBeCalledTimes(1);
  });
});
