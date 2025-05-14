import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ message, type = "success", onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev > 0) {
          return prev - 2;
        }
        clearInterval(timer);
        return 0;
      });
    }, 100);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const getToastClasses = () => {
    const baseClasses =
      "fixed top-4 right-4 transform transition-transform duration-500 ease-in-out shadow-lg z-50 min-w-[300px]";
    return `${baseClasses} animate-slideIn`;
  };

  return (
    <div className={getToastClasses()}>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 text-xl mr-3" />
            <span className="text-gray-800 font-medium">{message}</span>
          </div>
        </div>
        <div
          className="h-1 bg-green-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
  warning: (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
  info: (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
};

export default Toast;
