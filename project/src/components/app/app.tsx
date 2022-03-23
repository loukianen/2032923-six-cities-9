import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import AuthPage from '../../pages/auth-page/auth-page';
import RoomPage from '../../pages/room-page/room-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import Layout from '../layout/layout';
import {getAuthStatus} from '../../store/user-process/selectors';
import {AppRoute} from '../../const';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === 'unknown') {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.City} element={<MainPage />} />
          <Route path={AppRoute.Login} element={<AuthPage />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.RoomId} element={<RoomPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
