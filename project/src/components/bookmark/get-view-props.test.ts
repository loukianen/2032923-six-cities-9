import {getViewProps} from './bookmark';

describe('Function: getViewProps', () => {
  it('should return props for big icon if type is "room"', () => {
    const expectedProps = {
      svgClassName: 'property__bookmark-icon',
      width: '31',
      height: '33',
    };
    expect(getViewProps(true)).toEqual(expectedProps);
  });

  it('should return props for usual icon if type is not "room"', () => {
    const expectedProps = {
      svgClassName: 'place-card__bookmark-icon',
      width: '18',
      height: '19',
    };
    expect(getViewProps(false)).toEqual(expectedProps);
  });
});
