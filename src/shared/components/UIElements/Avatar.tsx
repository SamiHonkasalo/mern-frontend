import React from 'react';

import './Avatar.css';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  image: string;
  alt: string;
  width?: string;
}

const Avatar: React.FC<Props> = ({
  className,
  style,
  image,
  alt,
  width,
}: Props) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width, height: width }} />
    </div>
  );
};

export default Avatar;
