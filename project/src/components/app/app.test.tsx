import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import makeFakeOffers from '../../mocks/offers';
import makeFakeUser from '../../mocks/user';
import {AppRoute, AuthorizationStatus, cityNames, NameSpace} from '../../const';
import App from './app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Comments]: [],
  [NameSpace.Favorites]: [],
  [NameSpace.Offers]: makeFakeOffers(3, 'Moscow'),
  [NameSpace.OffersNearby]: makeFakeOffers(),
  [NameSpace.Room]: {...makeFakeOffers(1)[0], description: 'A routing test was passed successfully'},
  [NameSpace.User]: {
    user: makeFakeUser(),
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage & Paris" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/in Paris/i)).toBeInTheDocument();
  });

  it.each(cityNames)('should render "MainPage & city name" when user navigate to "/%s"', (cityName) => {
    history.push(`${AppRoute.Root}${cityName}`);

    render(fakeApp);

    const controlText = `We could not find any property available at the moment in ${cityName}`;

    expect(screen.getByText(controlText)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByTestId('login__title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render "Favorites" when authorized user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });

  it('should render "Room" when user navigate to "/offer/1"', () => {
    history.push(`${AppRoute.Room}1`);

    render(fakeApp);

    expect(screen.getByText(/A routing test was passed successfully/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Come back to main page')).toBeInTheDocument();
  });
});
