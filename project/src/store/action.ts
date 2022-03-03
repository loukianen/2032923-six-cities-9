import {createAction} from '@reduxjs/toolkit';
import { Offers } from '../types/offers'

export const setCity = createAction<string>('main/setCity');

export const setOffers = createAction<Offers>('main/setCity');
