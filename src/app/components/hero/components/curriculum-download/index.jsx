"use client";

import { useState, useEffect, useRef } from "react";

const DownloadCV = ({ translations }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const downloadCV = (language) => {
    const fileName =
      language === "pt"
        ? "curriculum-diogo-pt-br.pdf"
        : "curriculum-diogo-en.pdf";
    const link = document.createElement("a");
    link.href = `/assets/files/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDropdownOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "flex" }}>
      <div
        className="tmp-btn hover-icon-reverse btn-border btn-md tmp-modern-button radius-round download-icon"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{ cursor: "pointer" }}
      >
        <div className="icon-reverse-wrapper">
          <span className="btn-text">
            {translations?.downloadCV || "Baixar Currículo"}
          </span>
          <div className="btn-hack" />
          <span className="btn-icon">
            <i className="ffa-sharp fa-regular fa-download" />
          </span>
          <span className="btn-icon">
            <i className="ffa-sharp fa-regular fa-download" />
          </span>
        </div>
      </div>
      {isDropdownOpen && (
        <div
          className="cv-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            // left: "0",
            zIndex: 1000,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            minWidth: "170px",
            marginTop: "5px",
          }}
        >
          <button
            onClick={() => downloadCV("pt")}
            style={{
              display: "block",
              width: "100%",
              padding: "12px 16px",
              border: "none",
              backgroundColor: "transparent",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "14px",
              color: "#333",
              borderBottom: "1px solid #eee",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            🇧🇷 Português
          </button>
          <button
            onClick={() => downloadCV("en")}
            style={{
              display: "block",
              width: "100%",
              padding: "12px 16px",
              border: "none",
              backgroundColor: "transparent",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "14px",
              color: "#333",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            🇺🇸 English
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadCV;
