import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import store from './store/store';
import {fetchOffersAction, checkAuthAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer position="top-center" />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
