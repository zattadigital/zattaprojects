import Link from "next/link";
import MobileMenu from "./components/mobile-menu";
import LanguageSelector from "../LanguageSelector";
import { GITHUB_URL, LINKEDIN_URL } from "../../constants";

const Header = ({ locale, translations }) => {
  const t = translations?.nav || {};

  return (
    <header className="tmp-header-area-start header-one header--sticky header--transparent">
      {/* header mid area start */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="header-content">
              <div className="logo">
                <a href="index.html">DIOGO</a>
              </div>
              <div className="tmp-mainmenu-nav d-none d-xl-block">
                <nav className="navbar-example2 onepagenav">
                  <ul className="tmp-mainmenu nav nav-pills">
                    <li className="current">
                      <Link className="smoth-animation" href="#home">
                        {t.home}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="smoth-animation" href="#skills">
                        {t.skills}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="smoth-animation" href="#experience">
                        {t.experience}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="smoth-animation" href="#portfolio">
                        {t.portfolio}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="smoth-animation" href="#contacts">
                        {t.contact}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="tmp-header-right">
                <div className="social-share-wrapper d-none d-md-block">
                  <div className="social-link">
                    <a href={LINKEDIN_URL} target="_blank">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                  </div>
                </div>
                <div className="social-share-wrapper d-none d-md-block">
                  <div className="social-link">
                    <a href={GITHUB_URL} target="_blank">
                      <i className="fa-brands fa-github" />
                    </a>
                  </div>
                </div>
                <div
                  className="language-selector-wrapper d-md-block"
                  style={{ marginRight: "15px" }}
                >
                  <LanguageSelector currentLocale={locale} />
                </div>
                <div className="tmp-side-collups-area d-block d-xl-none">
                  <MobileMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header mid area end */}
    </header>
  );
};

export default Header;
