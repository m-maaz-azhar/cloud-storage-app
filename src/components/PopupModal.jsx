import React from "react";
import { FiX } from 'react-icons/fi';

function PopupModal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <FiX className="h-6 w-6" />
            </button>
            <div className="mt-4">{children}</div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
      )}
    </>
  );
}

export default PopupModal;