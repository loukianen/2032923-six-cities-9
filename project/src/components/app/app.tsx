import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import AuthPage from '../../pages/auth-page/auth-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { Offers } from '../../types/offers';

function App(props: Offers): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage offers={props.offers} />} />
          <Route path='login' element={<AuthPage />} />
          <Route path='favorites' element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path='offer/:id' element={<RoomPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
