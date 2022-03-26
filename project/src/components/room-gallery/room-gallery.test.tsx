import {render, screen} from '@testing-library/react';
import RoomGallery from './room-gallery';
import makeFakeOffers from '../../mocks/offers';

describe('Component: RoomGallery', () => {
  const images = makeFakeOffers(1)[0].images;

  render(<RoomGallery images={images} />);

  const imageElements = screen.getAllByAltText(/studio/i);
  const imageSrcAttributes = imageElements.map((element) => element.getAttribute('src'));

  it.each(images)('should render correctly %s', (image) => {
    expect(imageSrcAttributes).toContain(image);
  });
});
