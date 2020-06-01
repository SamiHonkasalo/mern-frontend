import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.css';
import Backdrop from './Backdrop';

interface OverlayProps {
    className?: string;
    headerClass?: string;
    contentClass?: string;
    footerClass?: string;
    style?: React.CSSProperties;
    header?: string;
    footer?: React.ReactElement;
    children?: React.ReactElement;
    onSubmit?: () => void;
}

const ModalOverlay: React.FC<OverlayProps> = (props: OverlayProps) => {
    const content = (
        <div className={`modal ${props.className}`} style={props.style}>
            <header className={`modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}>
                <div className={`modal__content ${props.contentClass}`}>{props.children}</div>
                <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
            </form>
        </div>
    );
    const modalElem = document.getElementById('modal-hook');
    if (modalElem) {
        return ReactDOM.createPortal(content, modalElem);
    } else return null;
};

interface ModalProps {
    show: boolean;
    onCancel: () => void;
    overlayProps?: OverlayProps;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    const nodeRef = useRef(null);
    return (
        <React.Fragment>
            {props.show && <Backdrop onClick={props.onCancel} />}
            <CSSTransition
                nodeRef={nodeRef}
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...props.overlayProps} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;
