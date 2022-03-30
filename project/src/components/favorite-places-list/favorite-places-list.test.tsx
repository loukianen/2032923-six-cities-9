import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import FavoritePlacesList from './favorite-places-list';
import {AuthorizationStatus, NameSpace} from '../../const';
import makeFakeOffers from '../../mocks/offers';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({[NameSpace.User]: {
  authorizationStatus: AuthorizationStatus.Auth,
}});

describe('Component: FavoritePlacesList', () => {
  it('should render all recived offer', () => {
    const offersAmount = 4;
    const props = { offers: makeFakeOffers(offersAmount)};

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritePlacesList {...props} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId('place-card').length).toBe(offersAmount);
  });
});
