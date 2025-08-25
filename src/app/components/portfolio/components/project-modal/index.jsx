"use client";

import { useEffect } from "react";
import Image from "next/image";

const ProjectModal = ({ isOpen, onClose, project, translations }) => {
  const t = translations?.portfolio || {};
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-hidden={!isOpen}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 9999,
      }}
      onClick={handleOverlayClick}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="fa-solid fa-xmark" />
              </span>
            </button>
          </div>
          <div className="">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="portfolio-popup-thumbnail">
                  <div className="image">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        className="w-100"
                        width={500}
                        height={500}
                        src={project.image}
                        alt={project.title}
                      />
                    </a>
                  </div>
                  {/* Botão abaixo da imagem */}
                  <div className="mt-5 text-center">
                    <a
                      className="tmp-btn hover-icon-reverse btn-border tmp-modern-button radius-round download-icon"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <div className="icon-reverse-wrapper">
                        <span className="btn-text">{t.accessProject}</span>
                        <div className="btn-hack" />
                        <span className="btn-icon">
                          <i className="fa-solid fa-external-link" />
                        </span>
                        <span className="btn-icon">
                          <i className="fa-solid fa-external-link" />
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="text-content">
                  <h3>{project.title}</h3>
                  <p>
                    <i className="fa-solid fa-globe" style={{ marginRight: "5px" }} />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.url}
                    </a>
                  </p>
                  <p className="mb--30">{project.description}</p>

                  {project.features && project.features.length > 0 && (
                    <div className="mb--30">
                      <h6>{t.featuresTitle}</h6>
                      <ul
                        style={{
                          paddingLeft: "0",
                          fontSize: "14px",
                          lineHeight: "1.6",
                          listStyle: "none",
                        }}
                      >
                        {project.features.map((feature, index) => (
                          <li
                            key={index}
                            style={{
                              marginBottom: "8px",
                              display: "flex",
                              alignItems: "center",
                              lineHeight: "1.3",
                            }}
                          >
                            <i
                              className="fa-solid fa-circle-check"
                              style={{
                                color: "#28a745",
                                marginRight: "8px",
                                marginTop: "2px",
                                fontSize: "12px",
                                flexShrink: 0,
                              }}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb--30">
                      <h6>{t.technologiesTitle}</h6>

                      <p>{project.detailedTechnologies}</p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                          marginTop: "8px",
                        }}
                      >
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            style={{
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              color: "white",
                              padding: "3px 8px",
                              borderRadius: "10px",
                              fontSize: "11px",
                              fontWeight: "500",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="button-group button-group-pd mt--20">
                    {/* <a
                      className="tmp-btn hover-icon-reverse btn-border tmp-modern-button radius-round download-icon"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon-reverse-wrapper">
                        <span className="btn-text">VISITAR SITE</span>
                        <div className="btn-hack" />
                        <img
                          src="assets/images/button/btg-bg.svg"
                          alt=""
                          className="btn-bg"
                        />
                        <img
                          src="assets/images/button/btg-bg-2.svg"
                          alt=""
                          className="btn-bg-hover"
                        />
                        <span className="btn-icon">
                          <i className="fa-solid fa-external-link" />
                        </span>
                        <span className="btn-icon">
                          <i className="fa-solid fa-external-link" />
                        </span>
                      </div>
                    </a> */}

                    <button
                      className="tmp-btn hover-icon-reverse btn-border tmp-modern-button radius-round download-icon"
                      onClick={onClose}
                      style={{ marginLeft: "10px" }}
                    >
                      <div className="icon-reverse-wrapper">
                        <span className="btn-text">{t.close}</span>
                        <div className="btn-hack" />

                        <span className="btn-icon">
                          <i className="fa-regular fa-times" />
                        </span>
                        <span className="btn-icon">
                          <i className="fa-regular fa-times" />
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                {/* End of .text-content */}
              </div>
            </div>
            {/* End of .row Body*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
