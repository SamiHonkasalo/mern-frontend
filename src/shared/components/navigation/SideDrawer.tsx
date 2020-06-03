import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

interface Props {
  children: React.ReactNode;
  show: boolean;
  onClick: () => void;
}

const SideDrawer: React.FC<Props> = ({ children, show, onClick }: Props) => {
  const nodeRef = useRef(null);
  const content = (
    <CSSTransition
      in={show}
      nodeRef={nodeRef}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside
        role="menu"
        tabIndex={0}
        className="side-drawer"
        onClick={onClick}
        onKeyDown={onClick}
      >
        {children}
      </aside>
    </CSSTransition>
  );
  const el = document.getElementById('drawer-hook');
  if (el) {
    return ReactDOM.createPortal(content, el);
  }
  return null;
};

export default SideDrawer;
