import {render, screen} from '@testing-library/react';
import RoomFeaturesList from './room-features-list';
import makeFakeOffers from '../../mocks/offers';

describe('Component: RoomFeaturesList', () => {
  const features = makeFakeOffers(1)[0].goods;

  it.each(features)('should render correctly %s', (feature) => {
    render(<RoomFeaturesList goods={features} />);

    expect(screen.getByText(feature)).toBeInTheDocument();
  });
});
