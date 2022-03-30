import {Routes, Route} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from '@testing-library/react-hooks';
import {Provider} from 'react-redux';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {PlaceCardProps, PlaceCardType} from '../../types/other-types';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import PlaceCard from './place-card';
import makeFakeOffers from '../../mocks/offers';

function clickAtObject(testId: string) {
  userEvent.click(screen.getByTestId(testId));
}

const makeFakePlaceCardProps = (type: PlaceCardType, shouldAddOnActiveOffer: boolean) => {
  const offer = makeFakeOffers(1)[0];
  const onActiveOffer = jest.fn();
  let props: PlaceCardProps = {offer, placeCardType: type};
  if (shouldAddOnActiveOffer) {
    props = {...props, onActiveOffer};
  }
  return props;
};

const renderPlaceCard = (store: MockStore, history: History, props: PlaceCardProps) => {
  render (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.RoomId}
            element={<h1>Page room with id - {props.offer.id}</h1>}
          />
          <Route
            path='/placecard'
            element={<PlaceCard {...props} />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>,
  );
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Component: PlaceCard', () => {
  describe('should render correctly', () => {
    beforeEach(() => {
      history.push('/placecard');
    });

    it('props data', () => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }});
      const props = makeFakePlaceCardProps('placeCard', false);

      renderPlaceCard(store, history, props);

      expect(screen.getByAltText('Place').getAttribute('src')).toBe(props.offer.previewImage);
      expect(screen.getByText(`€${props.offer.price}`)).toBeInTheDocument();
      expect(screen.getByText(props.offer.title)).toBeInTheDocument();
    });

    const dataForCheckingLayout = [
      ['placeCard', 'cities__place-card', 'cities__image-wrapper', 'place-card__info'],
      ['favorite', 'favorites__card', 'favorites__image-wrapper', 'favorites__card-info'],
      ['placeNearby', 'near-places__card', 'near-places__image-wrapper', 'place-card__info'],
    ] as Array<[PlaceCardType, string, string, string]>;

    it.each(dataForCheckingLayout)('layout of %s', (type, articleClass, wrapperClass, infoClass) => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }});
      const props = makeFakePlaceCardProps(type, false);

      renderPlaceCard(store, history, props);

      expect(screen.getByTestId('place-card').getAttribute('class')).toContain(articleClass);
      expect(screen.getByTestId('place-card-img-wrapper').getAttribute('class')).toContain(wrapperClass);
      expect(screen.getByTestId('place-card-info').getAttribute('class')).toContain(infoClass);
    });
  });

  describe('should process correctly', () => {
    beforeEach(() => {
      history.push('/placecard');
    });

    it('enter and leave mouse events', () => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      }});
      const props = makeFakePlaceCardProps('placeCard', true);

      renderPlaceCard(store, history, props);

      expect(props.onActiveOffer).toBeCalledWith(null);

      act(() => {
        screen.getByTestId('place-card').dispatchEvent(new Event('mouseenter'));
      });
      expect(props.onActiveOffer).toBeCalledWith(props.offer.id);

      act(() => {
        screen.getByTestId('place-card').dispatchEvent(new Event('mouseleave'));
      });
      expect(props.onActiveOffer).toBeCalledWith(null);

      expect(props.onActiveOffer).toBeCalledTimes(3);
    });

    it('should navigate to Room page after click on title', () => {
      const store = mockStore({[NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      }});
      const props = makeFakePlaceCardProps('placeCard', false);

      renderPlaceCard(store, history, props);

      act(() => {
        clickAtObject('place-card-property-link');
      });

      expect(history.location.pathname).toBe(`${AppRoute.Room}${props.offer.id}`);
      expect(screen.getByText(`Page room with id - ${props.offer.id}`)).toBeInTheDocument();
    });
  });
});
