import React, { useState, useEffect } from "react";

function ToastMessage({ message, variant, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 text-white px-4 py-2 rounded-md transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${getVariantClasses()}`}
    >
      {message}
    </div>
  );
}

export default ToastMessage;
