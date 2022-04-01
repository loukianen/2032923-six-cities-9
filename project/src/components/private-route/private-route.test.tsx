import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import PrivateRoute from './private-route';

const renderPrivateRouter = (store: MockStore, history: History) => {
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<h1>Public Route</h1>}
          />
          <Route
            path='/favorites'
            element={
              <PrivateRoute>
                <h1>Private Route</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push('/favorites');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
    }});

    renderPrivateRouter(store, history);

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth},
    });

    renderPrivateRouter(store, history);

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
