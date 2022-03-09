import {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {toast} from 'react-toastify';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import AuthPage from '../../pages/auth-page/auth-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import {useAppDispatch} from '../../hooks';
import { setOffers } from '../../store/reducers/offers-reducer';
import offers from '../../mocks/offers';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch((nextDispatch, getState, api) => {
      toast.promise(
        api.get('/hotels')
          .then((response) => {
            nextDispatch(setOffers(response.data));
          }),
        {
          pending: 'Loading...',
          error: 'Network error',
        },
      );
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Login} element={<AuthPage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Room} element={<RoomPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
