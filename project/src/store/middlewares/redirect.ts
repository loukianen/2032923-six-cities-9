import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import reducer from '../root-reducer';
import {redirectToRoute} from '../actions';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === redirectToRoute.type) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
