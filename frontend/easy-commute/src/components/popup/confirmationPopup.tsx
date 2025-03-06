// src/components/shared/Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  return modalRoot
    ? ReactDOM.createPortal(
        <div className="popup-overlay">
          <div className="popup">
            {children}
          </div>
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;
