import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {PlaceCardType} from '../../types/other-types';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import Bookmark, {BookmarkProps} from './bookmark';

const renderBookmark = (store: MockStore, history: History, props: BookmarkProps) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<h1>Public Route</h1>}
          />
          <Route
            path='/bookmark'
            element={<Bookmark {...props} />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const bookmarkProps = {hotelId: 1, isFavorite: true, type: 'placeCard' as PlaceCardType};

describe('Component: Bookmark', () => {
  describe('should render', () => {
    beforeEach(() => {
      history.push('/bookmark');
    });

    it('link if user is unauthorized', () => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }});

      renderBookmark(store, history, bookmarkProps);

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('not active button if offer is not Favorite and with "room" type', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      }});

      renderBookmark(store, history, { ...bookmarkProps, isFavorite: false, type: 'room'});

      const buttonClassName = screen.getByRole('button').getAttribute('class');
      const isActive = buttonClassName?.includes('--active');
      const isRoom = buttonClassName?.includes('property__bookmark-button');

      expect(isActive).toBeFalsy();
      expect(isRoom).toBeTruthy();
    });

    it('active button if offer is Favorite and with not "room" type', () => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      }});

      renderBookmark(store, history, bookmarkProps);

      const buttonClassName = screen.getByRole('button').getAttribute('class');
      const isActive = buttonClassName?.includes('--active');
      const isNotRoom = buttonClassName?.includes('place-card__bookmark-button');

      expect(isActive).toBeTruthy();
      expect(isNotRoom).toBeTruthy();
    });
  });

  describe('after user click button', () => {
    it('should call store.dispatch if user is authrized', () => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      }});
      store.dispatch = jest.fn();

      renderBookmark(store, history, bookmarkProps);
      userEvent.click(screen.getByRole('button'));

      expect(store.dispatch).toBeCalledTimes(1);
    });

    it('should navigate to /login if user is authrized', () => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      }});
      store.dispatch = jest.fn();

      renderBookmark(store, history, bookmarkProps);
      userEvent.click(screen.getByRole('link'));

      expect(history.location.pathname).toBe('/login');
      expect(store.dispatch).not.toBeCalled();
    });
  });
});
