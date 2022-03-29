import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/use-map';
import {MapProps, MapType} from '../../types/other-types';
import {Pins, IMG_URL} from '../../const';

function getClassName(type: MapType ): string {
  const mapping = {
    main: 'cities__map map',
    room: 'property__map map',
  };
  return mapping[type];
}

const defaultCustomIcon = new Icon({
  iconUrl: `${IMG_URL}${Pins.Normal}`,
  iconSize: [28, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: `${IMG_URL}${Pins.Active}`,
  iconSize: [28, 40],
  iconAnchor: [20, 40],
});

const useMapAdapter = (props: Omit<MapProps, 'type'>)=>{
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];
    if (map) {
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });
        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
        markers.push(marker);
      });
    }
    return () => {
      markers.forEach((marker) => {
        if (map) {
          marker.removeFrom(map);
        }
      });
    };
  }, [map, points, selectedPoint]);
  return mapRef;
};

function Map({city, points, selectedPoint, type}: MapProps): JSX.Element {
  const mapRef = useMapAdapter({city, points, selectedPoint});

  return <section ref={mapRef} className={getClassName(type)} data-testid="map"></section>;
}

export default Map;
