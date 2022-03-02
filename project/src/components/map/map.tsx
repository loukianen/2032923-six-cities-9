import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {Location, Points} from '../../types/offers';
import { Pins, IMG_URL } from '../../const';

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

type MapProps = {
  city: Location;
  points: Points;
  selectedPoint: number | null;
};

const useMapAdapter = (props:MapProps)=>{
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
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
      });
    }
  }, [map, points, selectedPoint]);
  return {mapRef};
};

function Map({city,points,selectedPoint}: MapProps): JSX.Element {
  const {mapRef} = useMapAdapter({city, points, selectedPoint});

  return <section className="cities__map map" ref={mapRef}></section>;
}

export default Map;
