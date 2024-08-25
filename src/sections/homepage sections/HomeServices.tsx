import { useGetServicesQuery } from "../../redux/features/services/carService.api";
import SectionTitle from "../../components/SectionTitle";
import { TCarService } from "../../types/carService.type";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeServices = () => {
  const { data: serviceData, isLoading } = useGetServicesQuery(undefined);

  return (
    <div className="mb-28">
      <SectionTitle sub="SERVICES WE PROVIDE" heading="Our Service Area" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-40">
        {serviceData?.slice(0, 6)?.map((service: TCarService) => (
          <div
            key={service._id}
            className="rounded-lg card p-6 bg-white mb-40 group"
          >
            <img
              src={service.image}
              className="rounded-lg mb-4 relative -top-36 object-cover w-[350px] h-[243px] mx-auto"
            />
            <h2 className="text-2xl font-bold -mt-32 text-gray-900 group-hover:text-white">
              {service.name}
            </h2>
            <p className="text-gray-500 mb-4 lg:h-14 xl:h-auto group-hover:text-white">
              {service.short_description}
            </p>
            <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold group-hover:bg-white group-hover:text-primary w-32">
              View Service
            </button>
          </div>
        ))}
      </div>

      {serviceData && (
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
