"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EMAIL, PHONE_NUMBER, LINKEDIN_URL, GITHUB_URL } from "../../../../constants";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Guarantee that the component is mounted before showing
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close menu when pressing ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen && isMounted) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isMounted]);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#experience", label: "Experience" },
    { href: "#contacts", label: "Contact" },
  ];

  return (
    <>
      <style jsx>{`
        .menu-link-item {
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }
        .mobile-menu-trigger {
          display: none;
        }

        @media (max-width: 1200px) {
          .mobile-menu-trigger {
            display: block;
          }
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 9998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-sidebar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 100vh;
          background: #1a1a2e;
          z-index: 9999;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
        }

        .mobile-menu-sidebar-wrapper.active {
          transform: translateX(0);
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu-header {
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mobile-menu-logo {
          color: #fff;
          font-size: 24px;
          font-weight: bold;
          text-decoration: none;
        }

        .mobile-menu-close {
          background: rgba(255, 77, 87, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          line-height: 1;
        }

        .mobile-menu-close:hover {
          background: rgba(255, 77, 87, 1);
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
        }

        .mobile-menu-nav {
          padding: 20px 0;
        }

        .mobile-menu-list {
          list-style: none;
          padding: 16px;
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }

        .mobile-menu-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-link {
          display: block;
          padding: 18px 20px;
          color: #fff;
          text-decoration: none;
          font-size: 20px;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mobile-menu-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #667eea;
          padding-left: 30px;
        }

        .mobile-menu-link::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: #667eea;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .mobile-menu-link:hover::before {
          transform: scaleY(1);
        }

        .mobile-menu-footer {
          padding: 30px 20px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 20px;
        }

        .find-with-me {
          color: rgba(255, 255, 255, 0.7);
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .social-links {
          display: flex;
          gap: 15px;
          font-size: 20px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #fff;
          font-size: 20px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #667eea;
          transform: translateY(-2px);
        }

        .hamburger-icon {
          cursor: pointer;
          padding: 10px;
          border: none;
          background: none;
          color: #fff;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .hamburger-icon:hover {
          color: #667eea;
        }
      `}</style>

      {/* Hamburger button */}
      <div className="mobile-menu-trigger">
        <button
          className="hamburger-icon hamberger-menu"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fa-light fa-bars humberger-menu" />
        </button>
      </div>

      {/* Overlay */}
      {isMounted && (
        <div
          className={`mobile-menu-overlay ${isOpen ? "active" : ""}`}
          onClick={closeMenu}
        />
      )}

      {/* Sidebar Menu */}
      {isMounted && (
        <div
          className={`mobile-menu-sidebar-wrapper ${isOpen ? "active" : ""}`}
        >
        {/* Header */}
        <div className="mobile-menu-header">
          <Link href="#home" className="mobile-menu-logo" onClick={closeMenu}>
            DIOGO
          </Link>
          <button
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="mobile-menu-nav">
          <ul className="mobile-menu-list tmp-mainmenu">
            {menuItems.map((item, index) => (
              <li key={index} className="mobile-menu-item">
                <Link
                  href={item.href}
                  className="menu-link-item"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mobile-menu-footer">
          <div className="find-with-me">CONTATO</div>
          <div className="social-links">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fa-brands fa-github" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fa-solid fa-envelope" />
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i className="fa-solid fa-phone" />
            </a>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
