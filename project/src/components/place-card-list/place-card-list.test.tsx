import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {PlaceCardListProps, PlaceCardType} from '../../types/other-types';
import {AuthorizationStatus} from '../../const';
import PlaceCardList from './place-card-list';
import makeFakeOffers from '../../mocks/offers';

const makeFakePlaceCardListProps = (type: PlaceCardType, shouldAddOnActiveOffer: boolean) => {
  const offers = makeFakeOffers(3);
  const onActiveOffer = jest.fn();
  let props: PlaceCardListProps = {offers, placeCardType: type};
  if (shouldAddOnActiveOffer) {
    props = {...props, onActiveOffer};
  }
  return props;
};

const renderPlaceCardList = (store: MockStore, history: History, props: PlaceCardListProps) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path='/placecardlist'
            element={<PlaceCardList {...props} />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: PlaceCardList', () => {
  describe('should render correctly', () => {
    beforeEach(() => {
      history.push('/placecardlist');
    });

    it('props data', () => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }});
      const props = makeFakePlaceCardListProps('placeCard', false);

      renderPlaceCardList(store, history, props);

      expect(screen.getAllByTestId('place-card').length).toBe(props.offers.length);
    });

    const dataForCheckingLayout = [
      ['placeCard', 'cities__places-list', 'tabs__content'],
      ['placeNearby', 'near-places__list', ''],
    ] as Array<[PlaceCardType, string, string]>;

    it.each(dataForCheckingLayout)('layout of %s', (type, placeListClass1, placeListClass2) => {
      const store = mockStore({USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }});
      const props = makeFakePlaceCardListProps(type, false);

      renderPlaceCardList(store, history, props);

      expect(screen.getByTestId('place-card-list').getAttribute('class')).toContain(placeListClass1);
      expect(screen.getByTestId('place-card-list').getAttribute('class')).toContain(placeListClass2);
    });
  });
});
