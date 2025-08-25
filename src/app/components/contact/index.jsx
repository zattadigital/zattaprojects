import dynamic from "next/dynamic";
import { sendContactEmail } from "../../actions/contact";

// Import dinâmico do formulário com loading
const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: true,
  loading: () => (
    <div className="contact-form">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        <i
          className="fa-solid fa-spinner fa-spin"
          style={{ marginRight: "10px", fontSize: "20px" }}
        />
        Carregando formulário de contato...
      </div>
    </div>
  ),
});

const Contact = ({ locale, translations }) => {
  const t = translations?.contact || {};

  return (
    <section className="get-in-touch-area tmp-section-gapTop" id="contacts">
      <div className="container">
        <div className="contact-get-in-touch-wrap">
          <div className="get-in-touch-wrapper position-relative overflow-hidden">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div className="section-head text-align-left">
                  <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <span className="subtitle theme-gradient">
                      {t.subtitle}
                    </span>
                  </div>
                  <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                    {t.title}
                  </h2>
                  <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                    {t.description}
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-inner">
                  <ContactForm sendContactEmail={sendContactEmail} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
