import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AuthorizationStatus, NameSpace} from '../../const';
import MainPageContent from './main-page-content';
import makeFakeOffers from '../../mocks/offers';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MainPageContent', () => {
  beforeEach(() => {
    history.push('/main');
  });

  it('should render correctly', () => {
    const store = mockStore({[NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
    }});
    const city = 'Amsterdam';
    const props = {
      offers: makeFakeOffers(3, city),
      city,
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/main'
              element={<MainPageContent {...props} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(`${props.offers.length} places to stay in ${city}`)).toBeInTheDocument();
    expect(screen.getByTestId('sorting-menu')).toBeInTheDocument();
    expect(screen.getByTestId('place-card-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    props.offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
