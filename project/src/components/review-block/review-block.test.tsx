import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus, NameSpace} from '../../const';
import ReviewBlock from './review-block';
import makeFakeComments from '../../mocks/comments';

const renderReviewBlock = (store: MockStore, history: History) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/review'
            element={<ReviewBlock />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Bookmark', () => {
  describe('should render correctly', () => {
    beforeEach(() => {
      history.push('/review');
    });

    it('if user is unauthorized', () => {
      const fakeState = {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
        [NameSpace.Comments]: makeFakeComments(),
      };
      const store = mockStore(fakeState);

      renderReviewBlock(store, history);

      expect(screen.getByTestId('reviews-amount').textContent).toBe(fakeState[NameSpace.Comments].length.toString());
      expect(screen.queryByTestId('reviews-form')).not.toBeInTheDocument();
    });

    it('if user is authorized', () => {
      const fakeState = {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
        [NameSpace.Comments]: makeFakeComments(),
      };
      const store = mockStore(fakeState);

      renderReviewBlock(store, history);

      expect(screen.getByTestId('reviews-form')).toBeInTheDocument();
    });
  });
});
