import { useGetServicesQuery } from "../../redux/features/services/carService.api";
import SectionTitle from "../../components/SectionTitle";
import { TCarService } from "../../types/carService.type";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const HomeServices = () => {
  const queryObj = {
    searchTerm: "",
    minTime: 0,
    maxTime: 120,
    priceRanges: [],
    selectedSort: "",
  };

  const { data } = useGetServicesQuery(queryObj);

  return (
    <div className="mb-28">
      <SectionTitle sub="SERVICES WE PROVIDE" heading="Our Service Area" />

      <div
        data-aos="zoom-in"
        data-aos-duration="800"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-40"
      >
        {data?.serviceData?.slice(0, 6)?.map((service: TCarService) => (
          <div
            key={service._id}
            className="rounded-lg card p-6 bg-white mb-40 group shadow-md"
          >
            <img
              src={service.image}
              className="rounded-lg mb-4 relative -top-36 object-cover w-[350px] h-[243px] mx-auto"
            />
            <h2 className="text-2xl font-bold -mt-32 text-gray-900 group-hover:text-white pl-7">
              {service.name}
            </h2>
            <p className="text-gray-500 mb-4 lg:h-14 xl:h-auto group-hover:text-white pl-7 font-semibold">
              {service.short_description}
            </p>
            <Link to={`/serviceDetails/${service._id}`}>
              <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold group-hover:bg-white group-hover:text-primary w-32 ml-7">
                View Service
              </button>
            </Link>
          </div>
        ))}
      </div>

      {data?.serviceData && (
        <div className="flex justify-center items-center gap-2 relative -top-24">
          <Link to="/services">
            <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold flex items-center gap-1">
              <span>View All Services</span>
              <FaLongArrowAltRight className="mb-1" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeServices;
