import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import reducer from '../reducers/reducers';
import {successfulAuth} from '../reducers/user-reducer';
import {redirectToRoute} from '../actions';
import {AppRoute} from '../../const';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === redirectToRoute.type) {
          browserHistory.push(action.payload);
        }
        if (action.type === successfulAuth.type) {
          browserHistory.push(AppRoute.Root);
        }

        return next(action);
      };
