import React from 'react';

import './Avatar.css';

interface Props {
    className?: string;
    style?: {};
    image: string;
    alt: string;
    width?: string;
}

const Avatar = (props: Props) => {
    return (
        <div className={`avatar ${props.className}`} style={props.style}>
            <img src={props.image} alt={props.alt} style={{ width: props.width, height: props.width }} />
        </div>
    );
};

export default Avatar;
