const Counter = ({ locale, translations }) => {
  const t = translations?.counter || {};
  return (
    <section className="counter-area">
      <div className="container">
        <div className="row g-5 animation-action-3">
          <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 paralax-image">
            <div className="year-of-expariance-wrapper bg-blur-style-one tmp-scroll-trigger tmp-fade-in animation-order-1">
              <div className="year-expariance-wrap with-flex">
                {/* <h2 class="year-number"><span class="counter">25 </span> </h2> */}
                <h2 className="counter year-number">
                  <span className="odometer" data-count={25}>
                    7
                  </span>
                </h2>
                <h3 className="year-title">
                  {t.experience}
                </h3>
              </div>
              <p className="year-para">
                {t.description}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
            <div className="counter-area-right-content">
              <div className="row g-5">
                <div className="col-lg-6 col-sm-6 col-12 paralax-image">
                  <div className="counter-card tmponhover active single-animation tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <h3 className="counter counter-title">
                      <span className="odometer" data-count={20}>
                        10
                      </span>
                      +
                    </h3>
                    <div className="tmp-light light-left" />
                    <p className="counter-para">
                      {t.projects}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12 paralax-image">
                  <div className="counter-card tmponhover single-animation tmp-scroll-trigger tmp-fade-in animation-order-2">
                    <h3 className="counter counter-title">
                      <span className="odometer" data-count={10}>
                        10
                      </span>
                      +
                    </h3>
                    <div className="tmp-light light-left" />
                    <p className="counter-para">{t.clients}</p>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12 paralax-image">
                  <div className="counter-card tmponhover single-animation tmp-scroll-trigger tmp-fade-in animation-order-3">
                    <h3 className="counter counter-title">
                      <span className="odometer" data-count={200}>
                        20
                      </span>
                      +
                    </h3>
                    <div className="tmp-light light-left" />
                    <p className="counter-para">{t.technologies}</p>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12 paralax-image">
                  <div className="counter-card tmponhover single-animation tmp-scroll-trigger tmp-fade-in animation-order-4">
                    <h3 className="counter counter-title">
                      <span className="odometer" data-count={1000}>
                        10
                      </span>
                      +
                    </h3>
                    <div className="tmp-light light-left" />
                    <p className="counter-para">{t.recommendations}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;
