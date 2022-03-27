import {render, screen} from '@testing-library/react';
import PlaceCardMark from './place-card-mark';

describe('Component: PlaceCardMark', () => {
  it('should render correctly', () => {
    render(<PlaceCardMark type={'room'} />);

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByTestId('place-card-mark')).toBeInTheDocument();
  });
});
