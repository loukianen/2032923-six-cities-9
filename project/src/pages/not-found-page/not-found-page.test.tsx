import {Routes, Route} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory, History} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundPage from './not-found-page';
import {AppRoute} from '../../const';

const renderNotFoundPage = (history: History) => {
  render(
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<h1>Main page</h1>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>,
  );
};

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  beforeEach(() => {
    history.push(AppRoute.NotFound);
  });

  it('should render correctly', () => {
    renderNotFoundPage(history);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText('Come back to main page')).toBeInTheDocument();
  });

  it('should navigate to MainPage if user click link', () => {
    renderNotFoundPage(history);

    userEvent.click(screen.getByRole('link'));

    expect(history.location.pathname).toBe(AppRoute.Root);
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
