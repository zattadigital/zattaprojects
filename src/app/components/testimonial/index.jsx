"use client";
import dynamic from "next/dynamic";

// Dynamic import para otimizar performance - carrega apenas quando necessário
const SwiperTestimonial = dynamic(() => import("./components/swiper-testimonial"), {
  ssr: false, // Desabilita SSR para este componente
  loading: () => (
    <div className="swiper testimonial-swiper">
      <div className="testimonial-inner-style-two">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            fontSize: "16px",
            color: "#666",
          }}
        >
          Carregando depoimentos...
        </div>
      </div>
    </div>
  ),
});

const Testimonial = () => {
  // Dados dos testimonials
  const testimonials = [
    {
      name: "Gilvonei Wingert",
      position: "Expert em integrações Digibee | Analista de Sistemas",
      company: "E-commerce Brasil",
      content:
        "O Moser é um profissional de personalidade branda, racional, de fácil comunicação, e com olhar crítico para o próprio trabalho. A responsabilidade e comprometimento dele em relação ao que se dispõe a fazer, mais o desejo pelo auto-aperfeiçoamento o tornam uma excelente adição à qualquer equipe",
      image: "assets/images/testimonial/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Gilvonei Wingert",
      position: "Expert em integrações Digibee | Analista de Sistemas",
      company: "E-commerce Brasil",
      content:
        "O Moser é um profissional de personalidade branda, racional, de fácil comunicação, e com olhar crítico para o próprio trabalho. A responsabilidade e comprometimento dele em relação ao que se dispõe a fazer, mais o desejo pelo auto-aperfeiçoamento o tornam uma excelente adição à qualquer equipe",
      image: "assets/images/testimonial/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Gilvonei Wingert",
      position: "Expert em integrações Digibee | Analista de Sistemas",
      company: "E-commerce Brasil",
      content:
        "O Moser é um profissional de personalidade branda, racional, de fácil comunicação, e com olhar crítico para o próprio trabalho. A responsabilidade e comprometimento dele em relação ao que se dispõe a fazer, mais o desejo pelo auto-aperfeiçoamento o tornam uma excelente adição à qualquer equipe",
      image: "assets/images/testimonial/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Gilvonei Wingert",
      position: "Expert em integrações Digibee | Analista de Sistemas",
      company: "E-commerce Brasil",
      content:
        "O Moser é um profissional de personalidade branda, racional, de fácil comunicação, e com olhar crítico para o próprio trabalho. A responsabilidade e comprometimento dele em relação ao que se dispõe a fazer, mais o desejo pelo auto-aperfeiçoamento o tornam uma excelente adição à qualquer equipe",
      image: "assets/images/testimonial/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Gilvonei Wingert",
      position: "Expert em integrações Digibee | Analista de Sistemas",
      company: "E-commerce Brasil",
      content:
        "O Moser é um profissional de personalidade branda, racional, de fácil comunicação, e com olhar crítico para o próprio trabalho. A responsabilidade e comprometimento dele em relação ao que se dispõe a fazer, mais o desejo pelo auto-aperfeiçoamento o tornam uma excelente adição à qualquer equipe",
      image: "assets/images/testimonial/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Gilvonei Wingert",
      position: "Expert em integrações Digibee | Analista de Sistemas",
      company: "E-commerce Brasil",
      content:
        "O Moser é um profissional de personalidade branda, racional, de fácil comunicação, e com olhar crítico para o próprio trabalho. A responsabilidade e comprometimento dele em relação ao que se dispõe a fazer, mais o desejo pelo auto-aperfeiçoamento o tornam uma excelente adição à qualquer equipe",
      image: "assets/images/testimonial/testimonial-1.jpg",
      rating: 5,
    },
  ];
  return (
    <section className="testimonial tmp-section-gapTop">
      <div className="testimonial-wrapper animation-action-3">
        <div className="container">
          <SwiperTestimonial testimonials={testimonials} />
          <div className="testimonial-btn-next-prev">
            <div className="swiper-button-next">
              <i className="fa-solid fa-arrow-right" />
            </div>
            <div className="swiper-button-prev">
              <i className="fa-solid fa-arrow-left" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
