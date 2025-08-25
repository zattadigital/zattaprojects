"use client";

import { useState, useEffect } from "react";
import { PHONE_NUMBER } from "../../constants";

const WhatsAppFloat = ({ locale, translations }) => {
  const t = translations?.whatsapp || {};
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // WhatsApp config
  const phoneNumber = PHONE_NUMBER;
  const defaultMessage = t.message;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100px);
            opacity: 0;
          }
        }

        .whatsapp-float {
          position: fixed;
          left: 30px;
          bottom: 30px;
          z-index: 9999;
          animation: slideInLeft 0.5s ease-out;
        }

        .whatsapp-button {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
        }

        .whatsapp-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
        }

        .whatsapp-button.minimized {
          animation: none;
          opacity: 0.7;
          transform: scale(0.8);
        }

        .whatsapp-icon {
          color: white;
          font-size: 28px;
          transition: all 0.3s ease;
        }

        .close-button {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          background: #ff4757;
          border: 2px solid white;
          border-radius: 50%;
          color: white;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .close-button:hover {
          background: #ff3742;
          transform: scale(1.1);
        }

        .tooltip {
          position: absolute;
          left: 75px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .tooltip::before {
          content: "";
          position: absolute;
          left: -5px;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: rgba(0, 0, 0, 0.8);
        }

        .whatsapp-float:hover .tooltip {
          opacity: 1;
        }

        .message-preview {
          position: absolute;
          left: 75px;
          bottom: 0;
          background: white;
          border: 1px solid #e1e1e1;
          border-radius: 12px;
          padding: 15px;
          max-width: 280px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          opacity: 0;
          transform: translateX(-10px);
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .whatsapp-float:hover .message-preview {
          opacity: 1;
          transform: translateX(0);
          pointer-events: all;
        }

        .message-preview h4 {
          margin: 0 0 8px 0;
          color: #25d366;
          font-size: 16px;
          font-weight: 600;
        }

        .message-preview p {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .whatsapp-float {
            left: 20px;
            bottom: 20px;
          }

          .whatsapp-button {
            width: 55px;
            height: 55px;
          }

          .whatsapp-icon {
            font-size: 24px;
          }

          .message-preview {
            display: none;
          }

          .tooltip {
            display: none;
          }
        }
      `}</style>

      <div className="whatsapp-float">
        {!isMinimized && (
          <>
            {/* Tooltip */}
            <div className="tooltip">{t.tooltip}</div>

            {/* Preview message */}
            <div className="message-preview">
              <h4>{t.title}</h4>
              <p>{t.description}</p>
            </div>
          </>
        )}

        {/* Main button */}
        <button
          className={`whatsapp-button ${isMinimized ? "minimized" : ""}`}
          onClick={openWhatsApp}
          title={t.buttonTitle}
        >
          <i className="fa-brands fa-whatsapp whatsapp-icon"></i>
        </button>

        {/* Close button */}
        {!isMinimized && (
          <button
            className="close-button"
            onClick={toggleMinimize}
            title={t.minimizeTitle}
          >
            ×
          </button>
        )}
      </div>
    </>
  );
};

export default WhatsAppFloat;
