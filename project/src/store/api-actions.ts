import { Dispatch } from '@reduxjs/toolkit';
import { setOffers } from './reducers/offers-reducer';
import { setAuthStatus } from './reducers/auth-status';
import { APIRoute } from '../const';
import { AxiosInstance, AxiosResponse } from 'axios';
import {errorHandle} from '../services/error-handle';
import { uniqueId, infoMessage } from '../utils';
import { StateType } from '../types/other-types';

export const fetchOffersAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  const spinerId = uniqueId('spiner');
  infoMessage.spinerRun(spinerId);
  try {
    api.get(APIRoute.Offers)
      .then((response: AxiosResponse) => {
        infoMessage.spinerStop(spinerId);
        nextDispatch(setOffers(response.data));
      })
      .catch((error) => {
        infoMessage.spinerStop(spinerId);
        errorHandle(error);
      });
  } catch(e) {
    infoMessage.spinerStop(spinerId);
  }
};

export const checkAuthAction = (nextDispatch: Dispatch, getState: () => StateType, api: AxiosInstance) => {
  const spinerId = uniqueId('spiner');
  infoMessage.spinerRun(spinerId);
  api.get(APIRoute.Login)
    .then((response: AxiosResponse) => {
      infoMessage.spinerStop(spinerId);
      nextDispatch(setAuthStatus('authorized'));
    })
    .catch((error) => {
      infoMessage.spinerStop(spinerId);
      nextDispatch(setAuthStatus('unauthorized'));
      errorHandle(error);
    });
};
