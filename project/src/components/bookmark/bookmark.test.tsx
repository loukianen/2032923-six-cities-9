import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {PlaceCardType} from '../../types/other-types';
import {AppRoute, AuthorizationStatus} from '../../const';
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
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }});

      renderBookmark(store, history, bookmarkProps);

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('not active button if offer is not Favorite', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      }});

      renderBookmark(store, history, { ...bookmarkProps, isFavorite: false});

      const buttonClassName = screen.getByRole('button').getAttribute('class');
      const isActive = buttonClassName?.includes('--active');

      expect(isActive).toBeFalsy();
    });

    it('active button if offer is Favorite', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      }});

      renderBookmark(store, history, bookmarkProps);

      const buttonClassName = screen.getByRole('button').getAttribute('class');
      const isActive = buttonClassName?.includes('--active');

      expect(isActive).toBeTruthy();
    });
  });

  describe('after user click button', () => {
    it('should call store.dispatch if user is authrized', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Auth,
      }});
      store.dispatch = jest.fn();

      renderBookmark(store, history, bookmarkProps);
      userEvent.click(screen.getByRole('button'));

      expect(store.dispatch).toBeCalledTimes(1);
    });

    it('should navigate to /login if user is authrized', () => {
      const store = mockStore({USER: {
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
