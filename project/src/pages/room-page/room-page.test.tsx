import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-router/history-router';
import {AppRoute, AuthorizationStatus, DEFAULT_USER, NameSpace} from '../../const';
import RoomPage from './room-page';
import makeFakeOffers from '../../mocks/offers';
import makeFakeUser from '../../mocks/user';
import makeFakeComments from '../../mocks/comments';

const renderRoomPage = (store: MockStore, history: History) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.RoomId}
            element={<RoomPage />}
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
const hotelId = 1;

describe('Component: RoomPage', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Room}${hotelId}`);
  });

  it('should render correctly', () => {
    const state = {
      [NameSpace.Room]: {...makeFakeOffers(1)[0], id: hotelId},
      [NameSpace.OffersNearby]: makeFakeOffers(),
      [NameSpace.Comments]: makeFakeComments(),
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
    };
    const store = mockStore(state);

    renderRoomPage(store, history);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('room-gallery')).toBeInTheDocument();

    const bookmarkElements = screen.getAllByTestId('bookmark-button');
    expect(bookmarkElements.every((element) => element.getAttribute('data-type') !== 'room')).toBeFalsy();

    expect(screen.getByTestId('room-features-list')).toBeInTheDocument();
    expect(screen.getByTestId('room-host')).toBeInTheDocument();
    expect(screen.getByTestId('property-reviews')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-list')).toBeInTheDocument();

    expect(screen.getByText(state[NameSpace.Room].title)).toBeInTheDocument();
    expect(screen.getByText(`${state[NameSpace.Room].bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`€${state[NameSpace.Room].price}`)).toBeInTheDocument();
    expect(screen.getByText(state[NameSpace.Room].description)).toBeInTheDocument();
  });

  it('should render correctly if user unauthorized', () => {
    const state = {
      [NameSpace.Room]: {...makeFakeOffers(1)[0], id: hotelId},
      [NameSpace.OffersNearby]: makeFakeOffers(),
      [NameSpace.Comments]: makeFakeComments(),
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: makeFakeUser(),
      },
    };
    const store = mockStore(state);

    renderRoomPage(store, history);

    const bookmarkElements = screen.getAllByTestId('bookmark-link');
    expect(bookmarkElements.every((element) => element.getAttribute('data-type') !== 'room')).toBeFalsy();
  });

  it('should not render page if room unexist', () => {
    const state = {
      [NameSpace.Room]: null,
      [NameSpace.OffersNearby]: [],
      [NameSpace.Comments]: [],
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: DEFAULT_USER,
      },
    };
    const store = mockStore(state);

    renderRoomPage(store, history);

    expect(screen.queryByTestId('room-page')).not.toBeInTheDocument();
  });
});
