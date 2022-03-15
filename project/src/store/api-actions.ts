import { Dispatch } from '@reduxjs/toolkit';
import { setOffers } from './reducers/offers-reducer';
import { setAuthStatus } from './reducers/auth-status';
import { setUser } from './reducers/user-reducer';
import { setRoom } from './reducers/room-reducer';
import { setOffersNearby } from './reducers/offers-nearby-reducer';
import { setComments } from './reducers/comments-reducer';
import { redirectToRoute } from './actions';
import { APIRoute, AppRoute, DEFAULT_USER } from '../const';
import { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { errorHandle } from '../services/error-handle';
import { StateType, AuthDataType } from '../types/other-types';

export const fetchCommentsAction = (hotelId: string) => (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(`${APIRoute.Comments}/${hotelId}`)
    .then((response: AxiosResponse) => {
      nextDispatch(setComments(response.data));
    })
    .catch((error) => {
      nextDispatch(setComments([]));
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const fetchOffersAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(APIRoute.Offers)
    .then((response: AxiosResponse) => {
      nextDispatch(setOffers(response.data));
    })
    .catch((error) => {
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const fetchOffersNearbyAction = (hotelId: string) => (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(`${APIRoute.Offers}/${hotelId}/nearby`)
    .then((response: AxiosResponse) => {
      nextDispatch(setOffersNearby(response.data));
    })
    .catch((error) => {
      nextDispatch(setOffersNearby([]));
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const fetchRoomAction = (hotelId: string) => (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(`${APIRoute.Offers}/${hotelId}`)
    .then((response: AxiosResponse) => {
      nextDispatch(setRoom(response.data));
    })
    .catch((error) => {
      nextDispatch(redirectToRoute(AppRoute.NotFound));
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const checkAuthAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(APIRoute.Login)
    .then((response: AxiosResponse) => {
      nextDispatch(setAuthStatus('authorized'));
      nextDispatch(setUser(response.data));
    })
    .catch((error) => {
      nextDispatch(setAuthStatus('unauthorized'));
      nextDispatch(setUser(DEFAULT_USER));
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};

export const authAction = (authData: AuthDataType) => (
  nextDispatch: Dispatch,
  getState: () => StateType,
  api: AxiosInstance,
) => {
  toast.promise(api.post(APIRoute.Login, authData)
    .then((response: AxiosResponse) => {
      nextDispatch(setAuthStatus('authorized'));
      nextDispatch(setUser(response.data));
      nextDispatch(redirectToRoute(AppRoute.Root));
    })
    .catch((error) => {
      nextDispatch(setAuthStatus('unauthorized'));
      nextDispatch(setUser(DEFAULT_USER));
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};
