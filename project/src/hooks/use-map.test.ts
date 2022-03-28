import {renderHook} from '@testing-library/react-hooks';
import {Map} from 'leaflet';
import useMap from './use-map';

const rootElement = document.createElement('div');

const fakeLocationData = {
  latitude: 10,
  longitude: 20,
  zoom: 10,
};

const expectedMapOptions = {
  center: {
    lat: 10,
    lng: 20,
  },
  zoom: 10,
};

const fakeRef = {
  all: [],
  current: rootElement,
};

describe('Hook: useMap', () => {
  it('should return map', () => {
    const {result} = renderHook(() =>
      useMap(fakeRef, fakeLocationData),
    );

    expect(result.current).toBeInstanceOf(Map);
    expect(result.current?.options).toEqual(expectedMapOptions);
  });
});
