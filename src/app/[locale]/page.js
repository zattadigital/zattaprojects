import Hero from "../components/hero";
import Header from "../components/header";
import Footer from "../components/footer";
import Contact from "../components/contact";
import Skills from "../components/skills";
import Portfolio from "../components/portfolio";
import Testimonial from "../components/testimonial";
import Certifications from "../components/certifications";
import Expiriences from "../components/expiriences";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Counter from "../components/counter";
import LanguageBanner from "../components/language-banner";

import { getTranslations } from '../../utils/translations';

export default async function LocalizedHome({ params }) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      {/* tpm-header-area start */}
      <Header locale={locale} translations={t} />
      {/* tpm-header-area end */}

      {/* tmp banner area start */}
      <Hero locale={locale} translations={t} />
      {/* tmp banner area end */}

      {/* Tpm Counter Area Start */}
      <Counter locale={locale} translations={t} />
      {/* Tpm Counter Area End */}

      {/* tmp skill area start */}
      <Skills locale={locale} translations={t} />
      {/* tmp skill area end */}

      {/* Tpm Latest Service Area Start */}
      <Certifications locale={locale} translations={t} />
      {/* Tpm Latest Service Area End */}

      {/* Tpm Education Experience Area Start */}
      <Expiriences locale={locale} translations={t} />
      {/* Tpm Education Experience Area End */}

      {/* Tpm Latest Portfolio Area Start */}
      <Portfolio locale={locale} translations={t} />
      {/* Tmp Latest Portfolio Area End */}

      {/* Tpm Testimonial Area Start */}
      <Testimonial locale={locale} translations={t} />
      {/* Tpm Testimonial Area End */}

      {/* Tpm Get In touch start */}
      <Contact locale={locale} translations={t} />
      {/* Tpm Get In touch End */}

      {/* Start Footer Area  */}
      <Footer locale={locale} translations={t} />
      {/* End Footer Area  */}

      {/* WhatsApp Float Button */}
      <WhatsAppFloat locale={locale} translations={t} />
      {/* WhatsApp Float Button */}

      {/* Language Banner */}
      <LanguageBanner locale={locale} translations={t} />
    </>
  );
}
