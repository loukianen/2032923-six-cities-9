import {Dispatch} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {setOffers} from './reducers/offers-reducer';
import {APIRoute} from '../const';
import { AxiosInstance, AxiosResponse } from 'axios';
import {StateType} from '../types/other-types';

export const fetchOffersAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  toast.promise(
    api.get(APIRoute.Offers)
      .then((response: AxiosResponse) => {
        nextDispatch(setOffers(response.data));
      }),
    {
      pending: 'Loading...',
      error: 'Network error',
    },
  );
};
