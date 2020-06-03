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

const ModalOverlay: React.FC<OverlayProps> = ({
  className,
  headerClass,
  contentClass,
  footerClass,
  style,
  header,
  footer,
  children,
  onSubmit,
}: OverlayProps) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit || ((e) => e.preventDefault())}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
  const modalElem = document.getElementById('modal-hook');
  if (modalElem) {
    return ReactDOM.createPortal(content, modalElem);
  }
  return null;
};

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  overlayProps?: OverlayProps;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onCancel,
  overlayProps,
}: ModalProps) => {
  const nodeRef = useRef(null);
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...overlayProps} />
      </CSSTransition>
    </>
  );
};

export default Modal;
