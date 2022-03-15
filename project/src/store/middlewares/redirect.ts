import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import reducer from '../reducers/reducers';
import {AppRoute} from '../../const';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'main/redirectToRoute') {
          browserHistory.push(action.payload);
        }
        if (action.type === 'user/successfulAuth') {
          browserHistory.push(AppRoute.Root);
        }

        return next(action);
      };
