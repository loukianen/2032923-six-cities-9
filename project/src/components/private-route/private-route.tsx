import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks/hooks';
import {NameSpace} from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[NameSpace.auth]);
  const hasAccess = authorizationStatus === 'authorized';

  return hasAccess ? children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
