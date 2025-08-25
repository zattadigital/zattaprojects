const Expiriences = ({ locale, translations }) => {
  const t = translations?.experience || {};
  return (
    <section
      className="education-experience tmp-section-gapTop"
      id="experience"
    >
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle theme-gradient">{t.subtitle}</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            {t.title}
            <br />
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            {t.description}
          </p>
        </div>
        <div className="row g-5 animation-action-3">
          <div className="col-lg-6 paralax-image col-sm-6">
            <div className="education-experience-card single-animation tmponhover tmp-scroll-trigger tmp-fade-in animation-order-1">
              <h4 className="edu-sub-title">{t.jobs?.nsh?.title}</h4>
              <h2 className="edu-title">
                {t.jobs?.nsh?.company} - {t.jobs?.nsh?.period}
              </h2>
              <div className="tmp-light light-top-left" />
              <p className="edu-para">{t.jobs?.nsh?.description}</p>
            </div>
          </div>
          <div className="col-lg-6 paralax-image col-sm-6">
            <div className="education-experience-card single-animation tmponhover tmp-scroll-trigger tmp-fade-in animation-order-2">
              <h4 className="edu-sub-title">{t.jobs?.compass?.title}</h4>
              <h2 className="edu-title">{t.jobs?.compass?.company}</h2>
              <div className="tmp-light light-top-left" />
              <p className="edu-para">{t.jobs?.compass?.description}</p>
            </div>
          </div>
          <div className="col-lg-6 paralax-image col-sm-6">
            <div className="education-experience-card single-animation tmponhover tmp-scroll-trigger tmp-fade-in animation-order-3">
              <h4 className="edu-sub-title">{t.jobs?.allinsys?.title}</h4>
              <h2 className="edu-title">
                {t.jobs?.allinsys?.company} - {t.jobs?.allinsys?.period}
              </h2>
              <div className="tmp-light light-top-left" />
              <p className="edu-para">{t.jobs?.allinsys?.description}</p>
            </div>
          </div>
          <div className="col-lg-6 paralax-image col-sm-6">
            <div className="education-experience-card single-animation tmponhover tmp-scroll-trigger tmp-fade-in animation-order-4">
              <h4 className="edu-sub-title">{t.jobs?.cimol?.title}</h4>
              <h2 className="edu-title">
                {t.jobs?.cimol?.company} - {t.jobs?.cimol?.period}
              </h2>
              <div className="tmp-light light-top-left" />
              <p className="edu-para">{t.jobs?.cimol?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expiriences;
