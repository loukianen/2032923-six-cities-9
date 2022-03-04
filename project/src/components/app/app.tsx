import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import AuthPage from '../../pages/auth-page/auth-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';

function App(): JSX.Element {
  const { city, offers } = useAppSelector((state) => state);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage offers={offers} city={city}/>} />
          <Route path={AppRoute.Login} element={<AuthPage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Room} element={<RoomPage offers={offers} />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
