import React, { useRef, useEffect } from 'react';

import './Map.css';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  zoom: number;
}

const Map: React.FC<Props> = ({ className, style, center, zoom }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });
      // eslint-disable-next-line no-new
      new window.google.maps.Marker({ position: center, map });
    }
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style} />;
};

export default Map;
