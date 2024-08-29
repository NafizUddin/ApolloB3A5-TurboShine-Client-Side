import SectionTitle from "../../components/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useGetReviewsQuery } from "../../redux/features/reviews/reviews.api";
import Loading from "../../components/Loading";
import { IFeedback } from "../../types/review.type";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Testimonial = () => {
  const { data, isLoading } = useGetReviewsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="-mt-16 pt-8 mb-14 testimonial">
      <SectionTitle sub="OUR HAPPY CUSTOMERS" heading="What Customer Says" />

      <div className="flex justify-center items-center gap-3 mt-2">
        <ReactStars
          count={5}
          value={data?.averageRating}
          size={30}
          color2={"#e08534"}
          edit={false}
          className="mt-1"
        />
        <div>
          <h1 className="text-xl text-primary font-semibold">
            {data?.averageRating}/5 (Based on {data?.reviews?.length} reviews)
          </h1>
        </div>
      </div>

      <div data-aos="zoom-in" data-aos-duration="800">
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          slidesPerGroup={data?.reviews?.length % 2 === 0 ? 2 : 1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            350: {
              slidesPerView: 1, // For small devices
              slidesPerGroup: 1,
            },
            800: {
              slidesPerView: 2, // For medium devices
              slidesPerGroup: 2,
            },
          }}
        >
          {data?.reviews
            ?.slice(0, 4)
            ?.map((singleCustomer: IFeedback, index: number) => (
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
                      <ReactStars
                        count={5}
                        value={singleCustomer.rating}
                        size={24}
                        color2={"#e08534"}
                        edit={false}
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="text-xl text-gray-600">
                      "{singleCustomer.feedback}"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {data?.reviews && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <Link to="/reviews">
            <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold flex items-center gap-1">
              <span>View All Reviews</span>
              <FaLongArrowAltRight className="mb-1" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
