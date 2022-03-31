import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div style={{ marginTop: '40vh', textAlign: 'center' }}>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>Come back to main page</Link>
    </div>
  );
}

export default NotFoundPage;
