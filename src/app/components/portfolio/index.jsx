  "use client";

import { useState } from "react";
import ProjectModal from "./components/project-modal";

const Portfolio = ({ locale, translations }) => {
  const t = translations?.portfolio || {};
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };



  const projects = t.projects || [];

  const renderProjects = () => {
    return (
      <div className="row animation-action-3">
        {projects?.map((project) => (
          <div className="col-lg-6 col-sm-6 paralax-image" key={project.title}>
            <div className="latest-portfolio-card tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-1">
              <div className="portfoli-card-img tmponhover single-animation active">
                <div className="img-box v2" style={{ height: "auto" }}>
                  <div
                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1 "
                    onClick={() => openModal(project)}
                  >
                    <img
                      className="w-100"
                      src={project.image}
                      alt="Thumbnail"
                    />
                  </div>
                </div>
                <div className="tmp-light light-left" />
              </div>
              <div className="portfolio-card-content-wrap">
                <div className="content-left" style={{ width: "100%" }}>
                  <h3 className="portfolio-card-title">
                    <div
                      className="link"
                      onClick={() => openModal(project)}
                      style={{ cursor: "pointer" }}
                    >
                      {project.title}
                    </div>
                  </h3>
                  <p className="portfoli-card-para">
                    {project.shortDescription}
                    <br />
                  </p>
                  {/* <button
                    onClick={() => openModal(project)}
                    className="tmp-btn hover-icon-reverse btn-border btn-sm tmp-modern-button radius-round"
                    style={{
                      marginTop: "15px",
                      fontSize: "14px",
                      padding: "8px 20px",
                      height: "auto",
                    }}
                  >
                    <div className="icon-reverse-wrapper">
                      <span className="btn-text">
                        {t.viewDetails || 'Ver Detalhes Que Implementei'}
                      </span>
                      <div className="btn-hack" />
                      <span className="btn-icon">
                        <i className="ffa-sharp fa-regular fa-eye" />
                      </span>
                      <span className="btn-icon">
                        <i className="ffa-sharp fa-regular fa-eye" />
                      </span>
                    </div>
                  </button> */}
                </div>
                {/* <a
                  href={project.url}
                  target="_blank"
                  className="tmp-arrow-icon-btn"
                >
                  <div className="btn-inner">
                    <i className="tmp-icon fa-solid fa-arrow-up-right" />
                    <i className="tmp-icon-bottom fa-solid fa-arrow-up-right" />
                  </div>
                </a> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="latest-portfolio-area custom-column-grid tmp-section-gapTop"
      id="portfolio"
    >
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle theme-gradient">{t.subtitle || 'Portfólio'}</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            {t.title || 'Transformando Ideias em Resultados'}
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            {t.description || 'Aqui você pode ver alguns dos meus projetos em produção.'}
          </p>
        </div>
        <div className="row animation-action-3">{renderProjects()}</div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
        translations={translations}
      />
    </div>
  );
};

export default Portfolio;
