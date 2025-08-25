import Link from "next/link";
import { EMAIL, PHONE_NUMBER, LINKEDIN_URL } from "../../constants";

const Footer = ({ locale, translations }) => {
  const t = translations?.footer || {};
  return (
    <div className="footer-stars-animation-wrapper-footer">
      {/* Start Footer Area  */}
      <footer className="footer-area footer-style-one-wrapper bg-color-footer bg_images tmp-section-gap">
        <div className="separator-animated-border border-top-footer animated-true" />
        <div className="separator-animated-border animated-true" />
        <div className="container">
          <div className="footer-main footer-style-one">
            <div className="row g-5">
              <div className="col-lg-5 col-md-6">
                <div className="single-footer-wrapper border-right mr--20">
                  <div className="logo">MOSER DIOGO</div>
                  <p className="description">{t.tagline}</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-footer-wrapper quick-link-wrap">
                  <h5 className="ft-title">{t.links}</h5>
                  <ul className="ft-link tmp-link-animation">
                    <li>
                      <Link href="#home">{t.about}</Link>
                    </li>
                    <li>
                      <Link href="#skills">{t.skills}</Link>
                    </li>
                    <li>
                      <Link href="#experience">{t.experience}</Link>
                    </li>
                    <li>
                      <Link href="#portfolio">{t.portfolio}</Link>
                    </li>
                    <li>
                      <Link href="#contacts">{t.contact}</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-footer-wrapper contact-wrap">
                  <h5 className="ft-title">{t.contact} </h5>
                  <ul className="ft-link tmp-link-animation">
                    <li>
                      <span className="ft-icon">
                        <i className="fa-solid fa-envelope" />
                      </span>
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </li>
                    <li>
                      <span className="ft-icon">
                        <i className="fa-solid fa-phone" />
                      </span>
                      <a href={`tel:${PHONE_NUMBER}`}>+{PHONE_NUMBER}</a>
                    </li>
                    <li>
                      <span className="ft-icon">
                        <i className="fa-brands fa-linkedin-in" />
                      </span>
                      <a href={LINKEDIN_URL} target="_blank">
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright-area-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-wrapper">
                <p className="copy-right-para tmp-link-animation">
                  {" "}
                  ©
                  <a href={LINKEDIN_URL} target="_blank">
                    Moser Diogo{" "}
                  </a>{" "}
                  | All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Footer Area  */}
      <div className="slider-bg-dot-shape">
        <div className="wrapper blocksync-scroll-trigger blocksync-stars-area fade_in animation-order-16">
          <div className="blocksync-stars" />
          <div className="blocksync-stars2" />
          <div className="blocksync-stars3" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
