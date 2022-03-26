import {render, screen} from '@testing-library/react';
import BookmarkContent from './bookmark-content';

describe('Component: BookmarkContent', () => {
  it('should render correctly', () => {
    const mockProps = {
      width: '18',
      height: '19',
      svgClassName: 'place-card__bookmark-icon',
    };

    render(<BookmarkContent {...mockProps}/>);

    const svgElement = screen.getByTestId('bookmark-content');

    expect(svgElement.getAttribute('class')?.split(' ')).toContain('place-card__bookmark-icon');
    expect(svgElement.getAttribute('width')).toBe('18');
    expect(svgElement.getAttribute('height')).toBe('19');
  });
});
