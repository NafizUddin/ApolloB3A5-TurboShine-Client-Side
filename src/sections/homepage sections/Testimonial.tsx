import SectionTitle from "../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import testimonialInfo from "../../jsons/testimonial.json";

const Testimonial = () => {
  return (
    <div className="-mt-16 pt-8 mb-14 testimonial">
      <SectionTitle sub="OUR HAPPY CUSTOMERS" heading="What Customer Says" />

      <div>
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          slidesPerGroup={2}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {testimonialInfo.map((singleCustomer, index) => (
            <SwiperSlide key={index}>
              <div className="mt-12 px-10 pb-24 bg-white">
                <div className="flex items-center gap-10 pt-8">
                  <div className="flex">
                    <img
                      src={singleCustomer.image}
                      className="rounded-full w-20 h-20 object-cover object-top"
                    />
                    <svg
                      viewBox="-1 0 19 19"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cf-icon-svg w-10 -ml-5"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917z"
                          fill="#dc232e"
                        ></path>

                        <path
                          d="M7.659 9.733a3.333 3.333 0 0 0-.362-2.507 2.543 2.543 0 0 0-.908-.851 2.504 2.504 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.23 2.23 0 0 0 2.515.211 3.335 3.335 0 0 1-1.655 1.403 3.942 3.942 0 0 1-.485.164 1.84 1.84 0 0 0-.445.128.567.567 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113 5.2 5.2 0 0 0 .475-.161A4.37 4.37 0 0 0 7.57 10.07q.053-.167.09-.337zm6.34 0a3.331 3.331 0 0 0-.362-2.507 2.54 2.54 0 0 0-.908-.851 2.502 2.502 0 0 0-1.364-.278 2.259 2.259 0 0 0-1.297 3.99 2.229 2.229 0 0 0 2.515.211 3.334 3.334 0 0 1-1.654 1.403 3.96 3.96 0 0 1-.486.164 1.847 1.847 0 0 0-.445.128.568.568 0 0 0 .32 1.059 2.496 2.496 0 0 0 .5-.113q.241-.07.475-.161a4.37 4.37 0 0 0 2.617-2.708q.052-.167.089-.337z"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold">
                      {singleCustomer.name}
                    </h1>
                    <p className="text-xl text-gray-600">
                      {singleCustomer.designation}
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-xl text-gray-600">
                    "{singleCustomer.comment}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
