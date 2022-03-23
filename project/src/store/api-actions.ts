import {Dispatch} from '@reduxjs/toolkit';
import {setOffers, replaceOffer} from './offers-process/offers-process';
import {replaceOfferNearby} from './reducers/offers-nearby-reducer';
import {successfulAuth, unSuccessfulAuth} from './user-process/user-process';
import {setRoom, setRoomData} from './reducers/room-reducer';
import {setComments} from './reducers/comments-reducer';
import {setFavorites, removeFavoriteOffer} from './favorites-process/favorites-process';
import {redirectToRoute} from './actions';
import {APIRoute, AppRoute} from '../const';
import {AxiosInstance, AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {errorHandle} from '../services/error-handle';
import {saveToken, dropToken} from '../services/token';
import {DEFAULT_ROOM_DATA} from '../const';
import {StateType, AuthDataType, CommentFormDataType, PlaceCardType} from '../types/other-types';

const storeActionMapping = {
  'placeCard': replaceOffer,
  'placeNearby': replaceOfferNearby,
  'favorite': removeFavoriteOffer,
  'room': setRoom,
};

function getStoreAction(type: PlaceCardType) {
  return storeActionMapping[type];
}

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

export const changeOfferStatusAction = (hotelId: number, isFavorite: boolean, actionType: PlaceCardType) =>
  (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
    const status = isFavorite ? 1 : 0;
    const path = `${APIRoute.Favorites}/${hotelId}/${status}`;
    toast.promise(api.post(path)
      .then((response: AxiosResponse) => {
        const storeAction = getStoreAction(actionType);
        nextDispatch(storeAction(response.data));
      })
      .catch((error) => {
        errorHandle(error);
      }),
    {
      pending: 'Loading...',
    });
  };

export const fetchFavoritesAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(api.get(APIRoute.Favorites)
    .then((response: AxiosResponse) => {
      nextDispatch(setFavorites(response.data));
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
