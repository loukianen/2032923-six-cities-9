import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {
  authAction, checkAuthAction, changeOfferStatusAction, fetchFavoritesAction,
  fetchOffersAction, fetchRoomDataAction, finishAuthAction, sendCommentAction
} from './api-actions';
import {setComments} from './comments-process/comments-process';
import {removeFavoriteOffer, setFavorites} from './favorites-process/favorites-process';
import {replaceOfferNearby} from './offers-nearby-process/offers-nearby-process';
import {replaceOffer, setOffers} from './offers-process/offers-process';
import {setRoom, setRoomData} from './room-process/room-process';
import {successfulAuth, unSuccessfulAuth} from './user-process/user-process';
import {redirectToRoute} from './actions';

import {APIRoute} from '../const';
import {State} from '../types/state';
import {PlaceCardType} from '../types/other-types';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import {Offer, RoomStateType} from '../types/offers';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  describe('AuthAction', () => {
    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, {token: 'secret'});
      Storage.prototype.setItem = jest.fn();
      const authData = {email: 'test@test.com', password: '123456'};

      expect(store.getActions()).toEqual([]);

      await store.dispatch(authAction(authData));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(successfulAuth.toString());

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities', 'secret');
    });

    it('should authorization status is «unauth» when server return 400', async () => {
      const store = mockStore();
      mockAPI
        .onPost(APIRoute.Login)
        .reply(400, {});
      const authData = {email: 'test@test.com', password: '123456'};

      expect(store.getActions()).toEqual([]);

      await store.dispatch(authAction(authData));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(unSuccessfulAuth.toString());
    });
  });

  describe('checkAuthAction', () => {
    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, {});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(successfulAuth.toString());
    });

    it('should authorization status is «unauth» when server return 401', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Login)
        .reply(401, {});
      Storage.prototype.removeItem = jest.fn();

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(unSuccessfulAuth.toString());
      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    });
  });

  describe('changeOfferStatusAction', () => {
    type ActionType = ActionCreatorWithPayload<Offer, string> | ActionCreatorWithPayload<RoomStateType, string>;
    type TestDataItem = [PlaceCardType, ActionType];

    const testData = [
      ['placeCard', replaceOffer],
      ['placeNearby', replaceOfferNearby],
      ['favorite', removeFavoriteOffer],
      ['room', setRoom],
    ] as TestDataItem[];


    it.each(testData)('should change favorite status when server return 200 from %s', async (whereWasCalled, action) => {
      const store = mockStore();
      const fakeDataForSend = {
        hotelId: 1,
        isFavorite: false,
        actionType: whereWasCalled,
      };
      const status = fakeDataForSend.isFavorite ? 0 : 1;

      mockAPI
        .onPost(`${APIRoute.Favorites}/${fakeDataForSend.hotelId}/${status}`)
        .reply(200, {});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(changeOfferStatusAction(fakeDataForSend));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(action.toString());
    });

    it.each(testData)('should set authStatus "unauth" when server return 401 from %s', async (whereWasCalled) => {
      const store = mockStore();
      const fakeDataForSend = {
        hotelId: 1,
        isFavorite: false,
        actionType: whereWasCalled,
      };
      const status = fakeDataForSend.isFavorite ? 0 : 1;

      mockAPI
        .onPost(`${APIRoute.Favorites}/${fakeDataForSend.hotelId}/${status}`)
        .reply(401, {});
      Storage.prototype.removeItem = jest.fn();

      expect(store.getActions()).toEqual([]);

      await store.dispatch(changeOfferStatusAction(fakeDataForSend));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(unSuccessfulAuth.toString());
      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should set favorites when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Favorites)
        .reply(200, {});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFavoritesAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setFavorites.toString());
    });

    it('should authorization status is «unauth» when server return 401', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Favorites)
        .reply(401, {});
      Storage.prototype.removeItem = jest.fn();

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchFavoritesAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(unSuccessfulAuth.toString());
      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    });
  });

  describe('fetchOffersAction', () => {
    it('should set offers when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(APIRoute.Offers)
        .reply(200, {});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchOffersAction());

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setOffers.toString());
    });
  });

  describe('fetchRoomDataAction', () => {
    it('should set room info when server return 200', async () => {
      const hotelId = '3';
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Offers}/${hotelId}`)
        .reply(200, {})
        .onGet(`${APIRoute.Offers}/${hotelId}/nearby`)
        .reply(200, {})
        .onGet(`${APIRoute.Comments}/${hotelId}`)
        .reply(200, {});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchRoomDataAction(hotelId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setRoomData.toString());
    });

    it('should set room defailt info and redirect to "not found" when server return 401', async () => {
      const hotelId = '3';
      const store = mockStore();
      mockAPI
        .onGet(`${APIRoute.Offers}/${hotelId}`)
        .reply(401, {});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(fetchRoomDataAction(hotelId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setRoomData.toString());
      expect(actions).toContain(redirectToRoute.toString());
    });
  });

  describe('finishAuthAction', () => {
    it('should set "unauth" status and redirect when server return 204', async () => {
      const store = mockStore();
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204, {});
      Storage.prototype.removeItem = jest.fn();

      expect(store.getActions()).toEqual([]);

      await store.dispatch(finishAuthAction());

      const actions = store.getActions().map(({type}) => type);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(actions).toContain(unSuccessfulAuth.toString());
      expect(actions).toContain(redirectToRoute.toString());
    });
  });

  describe('sendCommentAction', () => {
    const fakeDataForSend = {
      hotelId: 1,
      comment: {
        rating: 3,
        comment: 'Some text',
        checkboxesValue: [false, false, true, false, false],
      },
      onClearCommentForm: jest.fn(),
      onLockCommentForm: jest.fn(),
    };
    const requestPath = `${APIRoute.Comments}/${fakeDataForSend.hotelId}`;

    it('should set comment when server return 200 from %s', async () => {
      const store = mockStore();
      const {rating, comment} = fakeDataForSend.comment;

      mockAPI
        .onPost(requestPath, {rating, comment})
        .reply(200, {});

      expect(store.getActions()).toEqual([]);

      await store.dispatch(sendCommentAction(fakeDataForSend));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(setComments.toString());
      expect(fakeDataForSend.onClearCommentForm).toBeCalled();
    });

    it('should set authStatus "unauth" when server return 401 from %s', async () => {
      const store = mockStore();
      const {rating, comment} = fakeDataForSend.comment;

      mockAPI
        .onPost(requestPath, {rating, comment})
        .reply(401, {});
      Storage.prototype.removeItem = jest.fn();

      expect(store.getActions()).toEqual([]);

      await store.dispatch(sendCommentAction(fakeDataForSend));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toContain(unSuccessfulAuth.toString());
      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(fakeDataForSend.onLockCommentForm).toBeCalledWith(false);
    });
  });
});
