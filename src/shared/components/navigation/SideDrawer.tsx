import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

interface Props {
    children: React.ReactNode;
    show: boolean;
    onClick: () => void;
}

const SideDrawer: React.FC<Props> = (props: Props) => {
    const nodeRef = useRef(null);
    const content = (
        <CSSTransition
            in={props.show}
            nodeRef={nodeRef}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-drawer" onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook')!);
};

export default SideDrawer;
