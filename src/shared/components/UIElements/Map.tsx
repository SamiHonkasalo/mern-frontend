import React, { useRef, useEffect } from 'react';

import './Map.css';

interface Props {
    className?: string;
    style?: React.CSSProperties;
    center: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
    zoom: number;
}

const Map: React.FC<Props> = (props: Props) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const test = process.env.REACT_APP_GOOGLE_API_KEY;
    console.log(test);

    const { center, zoom } = props;
    useEffect(() => {
        if (mapRef && mapRef.current) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: center,
                zoom: zoom,
            });
            new window.google.maps.Marker({ position: center, map: map });
        }
    }, [center, zoom]);

    return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>;
};

export default Map;
