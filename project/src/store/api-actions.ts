import {Dispatch} from '@reduxjs/toolkit';
import {setOffers, replaceOffer} from './reducers/offers-reducer';
import {successfulAuth, unSuccessfulAuth} from './reducers/user-reducer';
import {setRoomData} from './reducers/room-reducer';
import {setComments} from './reducers/comments-reducer';
import {redirectToRoute} from './actions';
import {APIRoute, AppRoute} from '../const';
import {AxiosInstance, AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {errorHandle} from '../services/error-handle';
import {saveToken, dropToken} from '../services/token';
import {DEFAULT_ROOM_DATA} from '../const';
import {StateType, AuthDataType, CommentFormDataType} from '../types/other-types';

export const authAction = (authData: AuthDataType) => (
  nextDispatch: Dispatch,
  getState: () => StateType,
  api: AxiosInstance,
) => {
  toast.promise(api.post(APIRoute.Login, authData)
    .then((response: AxiosResponse) => {
      saveToken(response.data.token);
      nextDispatch(successfulAuth(response.data));
      nextDispatch(redirectToRoute(AppRoute.Root));
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

export const changeOfferStatusAction = (hotelId: string, isFavorite: boolean) =>
  (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
    const status = isFavorite ? 1 : 0;
    const path = `${APIRoute.Favorites}/${hotelId}/${status}`;
    toast.promise(api.get(path)
      .then((response: AxiosResponse) => {
        nextDispatch(replaceOffer(response.data));
      })
      .catch((error) => {
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

export const fetchRoomDataAction = (hotelId: string) =>
  (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
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

export const finishAuthAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
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

export const sendCommentAction = (comment: CommentFormDataType, hotelId: string, restoreFormData: (formData: CommentFormDataType) => void) =>
  (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
    toast.promise(api.post(`${APIRoute.Comments}/${hotelId}`, comment)
      .then((response: AxiosResponse) => {
        nextDispatch(setComments(response.data));
      })
      .catch((error) => {
        errorHandle(error);
        restoreFormData(comment);
      }),
    {
      pending: 'Loading...',
    });
  };
