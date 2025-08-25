import Image from "next/image";
import DownloadCV from "./components/curriculum-download";
import Link from "next/link";

const Hero = ({ locale, translations }) => {
  const t = translations?.hero || {};
  
  return (
    <>
      <div className="tmp-banner-one-area add-pattern" id="home">
        <div className="container">
          <div className="banner-one-main-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="banner-right-content">
                  <Image
                    className="tmp-scroll-trigger tmp-zoom-in animation-order-1"
                    src="/assets/images/pic-01.png"
                    alt="banner-img"
                    width={500}
                    height={500}
                  />
                  <h2 className="banner-big-text-1 up-down">
                    {t.roles?.fullstack}
                  </h2>
                  <h2 className="banner-big-text-2 up-down-2">
                    {t.roles?.fullstack}
                  </h2>
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="inner">
                  <span className="sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                    {t.greeting}
                  </span>
                  <h1 className="title tmp-scroll-trigger tmp-fade-in animation-order-2 mt--5">
                    {t.name} <br />
                    <span className="header-caption">
                      <span className="cd-headline clip is-full-width">
                        <span className="cd-words-wrapper">
                          <b className="is-visible theme-gradient">
                            {t.roles?.fullstack}
                          </b>
                          <b className="is-hidden theme-gradient">
                            {t.roles?.frontend}
                          </b>
                          <b className="is-hidden theme-gradient">
                            {t.roles?.backend }
                          </b>
                          <b className="is-hidden theme-gradient">
                            {t.roles?.mobile }
                          </b>
                          <b className="is-hidden theme-gradient">
                            {t.roles?.devops }
                          </b>
                        </span>
                      </span>
                    </span>
                  </h1>
                  <p className="disc tmp-scroll-trigger tmp-fade-in animation-order-3">
                    {t.description}
                  </p>
                  <div className="button-area-banner-one tmp-scroll-trigger tmp-fade-in animation-order-4">
                    <Link
                      className="tmp-btn hover-icon-reverse btn-border btn-md tmp-modern-button radius-round download-icon"
                      href="#portfolio"
                    >
                      <div className="icon-reverse-wrapper">
                        <span className="btn-text">{t.viewPortfolio}</span>
                        <div className="btn-hack" />
                        <span className="btn-icon">
                          <i className="ffa-sharp fa-regular fa-arrow-right" />
                        </span>
                        <span className="btn-icon">
                          <i className="ffa-sharp fa-regular fa-arrow-right" />
                        </span>
                      </div>
                    </Link>
                    <DownloadCV translations={t} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-bg-dot-shape">
          <div className="wrapper blocksync-scroll-trigger blocksync-stars-area fade_in animation-order-16">
            <div className="blocksync-stars" />
            <div className="blocksync-stars2" />
            <div className="blocksync-stars3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
