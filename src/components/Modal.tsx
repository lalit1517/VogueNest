import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="modal-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
