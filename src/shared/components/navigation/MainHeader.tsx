import React from 'react';

import './MainHeader.css';

interface Props {
  children?: React.ReactNode;
}

const MainHeader: React.FC<Props> = ({ children }: Props) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;
