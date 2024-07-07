// src/components/ModalPopup.jsx
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalPopup({ isOpen, onRequestClose, title, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      className="fixed inset-0 flex items-center justify-center p-4 z-[10000]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-4 rounded-md shadow-md w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onRequestClose} className="text-red-500 hover:text-red-700">
            X
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </Modal>
  );
};