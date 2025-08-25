import Image from "next/image";

const Certifications = ({ locale, translations }) => {
  const t = translations?.certifications || {};
  return (
    <section className="latest-service-area tmp-section-gapTop">
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
        <div className="row animation-action-2">
          <div className="col-lg-6 order-2 order-lg-1">
            <div className="paralax-image">
              <div className="service-card-v2 active single-animation tmponhover tmp-scroll-trigger tmp-fade-in animation-order-1">
                <h2 className="service-card-num">
                  {t.items?.oracle2023?.title}
                </h2>
                <p className="service-para">
                  {t.items?.oracle2023?.description}
                </p>
                <div className="tmp-light light-center" />
              </div>
            </div>
            <div className="paralax-image">
              <div className="service-card-v2 single-animation tmponhover tmp-scroll-trigger tmp-fade-in animation-order-2">
                <h2 className="service-card-num">
                  Scrum Foundation Professional Certificate SFPC
                </h2>
                <p className="service-para">
                  Scrum Foundation Professional Certificate SFPC - OUT 2024
                </p>
                <div className="tmp-light light-center" />
              </div>
            </div>
            <div className="paralax-image">
              <div className="service-card-v2 single-animation tmponhover tmp-scroll-trigger tmp-fade-in animation-order-3">
                <h2 className="service-card-num">
                  Microsoft Technology Associate - HTML5 CSS3
                </h2>
                <p className="service-para">
                  Microsoft Technology Associate - HTML5 CSS3 - JAN 2025
                </p>
                <div className="tmp-light light-center" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 paralax-image order-1 order-lg-2">
            <div className="service-card-user-image tmponhover single-animation active">
              <Image
                className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                src="/assets/images/pic-01.png"
                alt="latest-user-image"
                width={400}
                height={400}
              />
              <div className="tmp-light light-top-left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
