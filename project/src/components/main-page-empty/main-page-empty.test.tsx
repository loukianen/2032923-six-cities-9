import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import {AppRoute} from '../../const';
import MainPageEmpty from './main-page-empty';

const history = createMemoryHistory();

describe('Component: MainPageEmpty', () => {
  it('should render correctly', () => {
    const city = 'Hamburg';
    history.push(`${AppRoute.Root}${city}`);
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.City}
            element={<MainPageEmpty />}
          />
        </Routes>
      </HistoryRouter>,
    );

    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });
});
