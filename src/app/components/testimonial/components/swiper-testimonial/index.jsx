'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperTestimonial = ({ testimonials }) => {
  const swiperRef = useRef(null);

  const swiperConfig = {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
    },
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  return (
    <div className="swiper testimonial-swiper">
      <Swiper {...swiperConfig}>
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-inner-style-two single-animation tmponhover">
              <div className="testimonial-header">
                <div className="thumbnail">
                  <div className="card-icon">
                    <i className="fa-solid fa-user" style={{ fontSize: '30px' }} />
                  </div>
                </div>
                <h5 className="ts-header">
                  <span className="text-color-primary">{testimonial.name}</span><br/>{" "}
                  {testimonial.position}
                </h5>
              </div>
              <div className="testimonial-body">
                <p className="discription">
                  {testimonial.content}
                </p>
                {testimonial.rating && (
                  <div style={{
                    marginTop: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < testimonial.rating ? '#ffd700' : '#ddd',
                          fontSize: '16px'
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="tmp-light light-left" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperTestimonial;
