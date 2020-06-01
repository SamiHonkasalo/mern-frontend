import React from 'react';

import './Map.css';

interface Props {
    className: string;
    style: React.CSSProperties;
}

const Map: React.FC<Props> = (props: Props) => {
    return <div className={`map ${props.className}`} style={props.style}></div>;
};

export default Map;
