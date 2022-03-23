import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {getAuthStatus} from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const hasAccess = authorizationStatus === 'authorized';

  return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
