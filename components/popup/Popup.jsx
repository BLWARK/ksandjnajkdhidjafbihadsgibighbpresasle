import React from "react";

const Popup = ({ isVisible, onClose, title, message, icon }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <div className="flex items-center justify-center mb-4">
          <svg className={`w-12 h-12 ${icon.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {icon.path}
          </svg>
        </div>
        <p className="text-black text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-12 py-2 bg-blue-600 text-white rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
