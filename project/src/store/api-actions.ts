import { Dispatch } from '@reduxjs/toolkit';
import { setOffers } from './reducers/offers-reducer';
import { successfulAuth, unSuccessfulAuth } from './reducers/user-reducer';
import { setRoomData } from './reducers/room-reducer';
import { redirectToRoute } from './actions';
import { APIRoute, AppRoute } from '../const';
import { AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { errorHandle } from '../services/error-handle';
import { saveToken, dropToken } from '../services/token';
import { DEFAULT_ROOM_DATA } from '../const';
import { StateType, AuthDataType } from '../types/other-types';

export const authAction = (authData: AuthDataType) => (
  nextDispatch: Dispatch,
  getState: () => StateType,
  api: AxiosInstance,
) => {
  toast.promise(api.post(APIRoute.Login, authData)
    .then((response: AxiosResponse) => {
      saveToken(response.data.token);
      nextDispatch(successfulAuth(response.data));
    })
    .catch((error) => {
      errorHandle(error);
      nextDispatch(unSuccessfulAuth());
    }),
  {
    pending: 'Loading...',
  });
};

export const checkAuthAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(APIRoute.Login)
    .then((response: AxiosResponse) => {
      nextDispatch(successfulAuth(response.data));
    })
    .catch((error) => {
      dropToken();
      errorHandle(error);
      nextDispatch(unSuccessfulAuth());
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

export const fetchRoomDataAction = (hotelId: string) => (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  const roomData = DEFAULT_ROOM_DATA;
  toast.promise(api.get(`${APIRoute.Offers}/${hotelId}`)
    .then((resRoom: AxiosResponse) => {
      roomData.room = resRoom.data;
      api.get(`${APIRoute.Offers}/${hotelId}/nearby`)
        .then((resNearby: AxiosResponse) => {
          roomData.offersNearby = resNearby.data;
          api.get(`${APIRoute.Comments}/${hotelId}`)
            .then((resComment: AxiosResponse) => {
              roomData.comments = resComment.data;
              nextDispatch(setRoomData(roomData));
            });
        });
    })
    .catch((error) => {
      errorHandle(error);
      nextDispatch(setRoomData(DEFAULT_ROOM_DATA));
      nextDispatch(redirectToRoute(AppRoute.NotFound));
    }),
  {
    pending: 'Loading...',
  });
};

export const finishAuthAction = (
  nextDispatch: Dispatch,
  getState: () => StateType,
  api: AxiosInstance,
) => {
  toast.promise(api.delete(APIRoute.Logout)
    .then(() => {
      dropToken();
      nextDispatch(unSuccessfulAuth());
    })
    .catch((error) => {
      errorHandle(error);
    }),
  {
    pending: 'Loading...',
  });
};
