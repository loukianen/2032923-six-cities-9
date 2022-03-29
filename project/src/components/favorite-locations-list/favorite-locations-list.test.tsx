import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import FavoriteLocationsList from './favorite-locations-list';
import {AuthorizationStatus} from '../../const';
import makeFakeOffers from '../../mocks/offers';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({USER: {
  authorizationStatus: AuthorizationStatus.Auth,
}});

describe('Component: FavoriteLocationList', () => {
  it('should render three bloks with city favorites', () => {
    const parisOffers = makeFakeOffers(1, 'Paris');
    const amsterdamOffers = makeFakeOffers(3, 'Amsterdam');
    const hamburgOffers = makeFakeOffers(2, 'Hamburg');
    const props = {offers: [...parisOffers, ...amsterdamOffers, ...hamburgOffers]};

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteLocationsList {...props} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getAllByTestId('favorite-location').length).toBe(3);
  });
});
