import {renderHook, act} from '@testing-library/react-hooks';
import useHover from './use-hover';

describe('Hook: useHover', () => {
  it('should return ref-object and boolean', () => {
    const rootElement = document.createElement('div');
    rootElement.setAttribute('id', 'root');

    const {result} = renderHook(() =>
      useHover(rootElement),
    );

    const [elementRef, isHover] = result.current;
    const elementId = elementRef.current?.getAttribute('id');

    expect(elementId).toBe('root');
    expect(isHover).toBeFalsy();
  });

  it('should be correctly change state', () => {
    const rootElement = document.createElement('div');
    const mouseEnterEvent = new Event('mouseenter');
    const mouseLeaveEvent = new Event('mouseleave');

    const {result} = renderHook(
      () => useHover(rootElement),
    );
    let [, isHover] = result.current;
    expect(isHover).toBeFalsy();

    act(() => {
      rootElement.dispatchEvent(mouseEnterEvent);
    });

    [, isHover] = result.current;
    expect(isHover).toBeTruthy();

    act(() => {
      rootElement.dispatchEvent(mouseLeaveEvent);
    });

    [, isHover] = result.current;
    expect(isHover).toBeFalsy();
  });
});
