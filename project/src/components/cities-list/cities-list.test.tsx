import {Routes, Route} from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import {createMemoryHistory, History} from 'history';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityList from './cities-list';
import {AppRoute} from '../../const';

const renderCityList = (history: History, city: string) => {
  render(
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path={AppRoute.City}
          element={<h1>City page</h1>}
        />
        <Route
          path='/citylist'
          element={<CityList city={city} />}
        />
      </Routes>
    </HistoryRouter>,
  );
};

const history = createMemoryHistory();

describe('Component: BookmarkContent', () => {
  beforeEach(() => {
    history.push('/citylist');
  });

  it('should render correctly', () => {
    const activeCity = 'Paris';
    const activeClassName = 'tabs__item--active';
    const checkCitiesRendering = (nodes: HTMLElement[]) => nodes.every((node) => {
      const cityName = node.childNodes[0].textContent;
      const nodeClass = node.className;
      const isNodeClassActive = nodeClass.includes(activeClassName);
      return cityName === activeCity ? isNodeClassActive : !isNodeClassActive;
    });

    renderCityList(history, activeCity);

    const cityNameElements = screen.getAllByTestId('city-name');

    expect(checkCitiesRendering(cityNameElements)).toBeTruthy();
  });

  it('should navigate correctly', () => {
    const activeCity = 'Paris';
    const nextCity = 'Amsterdam';

    renderCityList(history, activeCity);

    const nextCityElement = screen.getByText(nextCity);
    userEvent.click(nextCityElement);

    expect(history.location.pathname).toBe(`/${nextCity}`);
  });
});
