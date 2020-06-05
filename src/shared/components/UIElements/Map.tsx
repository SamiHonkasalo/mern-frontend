import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  center: mapboxgl.LngLatLike;
  zoom: number;
}

const Map: React.FC<Props> = ({ className, style, center, zoom }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY || '';
    if (mapRef && mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom,
      });
      // eslint-disable-next-line no-new
      new mapboxgl.Marker().setLngLat(center).addTo(map);
    }
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style} />;
};

export default Map;
