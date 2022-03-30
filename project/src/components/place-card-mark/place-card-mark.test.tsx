import {render, screen} from '@testing-library/react';
import PlaceCardMark from './place-card-mark';
import {PlaceCardType} from '../../types/other-types';

describe('Component: PlaceCardMark', () => {
  const dataForCheckingLayout = [
    ['placeCard', 'place-card__mark'],
    ['favorite', 'place-card__mark'],
    ['placeNearby', 'place-card__mark'],
    ['room', 'property__mark'],
  ] as Array<[PlaceCardType, string]>;

  it.each(dataForCheckingLayout)('should render correctly layout of %s', (type, markClass) => {
    render(<PlaceCardMark type={type} />);

    expect(screen.getByTestId('place-card-mark').getAttribute('class')).toContain(markClass);
  });
});
