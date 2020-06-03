import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

interface Props {
  onClick: () => void;
}

const Backdrop: React.FC<Props> = ({ onClick }: Props) => {
  const el = document.getElementById('backdrop-hook');
  if (el) {
    return ReactDOM.createPortal(
      <div
        className="backdrop"
        onClick={onClick}
        onKeyDown={onClick}
        role="menu"
        tabIndex={-1}
      />,
      el
    );
  }
  return null;
};

export default Backdrop;
