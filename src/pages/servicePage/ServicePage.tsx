import { useGetServicesQuery } from "../../redux/features/services/carService.api";
import SectionTitle from "../../components/SectionTitle";
import { TCarService } from "../../types/carService.type";

const ServicePage = () => {
  const { data: serviceData } = useGetServicesQuery(undefined);

  return (
    <div className="my-10">
      <SectionTitle
        sub="OUR RANGE OF SERVICES"
        heading="Top-Tier Car Solutions"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-7 gap-5 mt-44">
        <div className="lg:col-span-1 xl:col-span-2"></div>
        <div className="lg:col-span-2 xl:col-span-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {serviceData?.map((service: TCarService) => (
              <div
                key={service._id}
                className="rounded-lg card p-6 bg-white mb-40 group"
              >
                <img
                  src={service.image}
                  className="rounded-lg mb-4 relative -top-36 object-cover w-[350px] h-[243px] mx-auto"
                />
                <h2 className="text-2xl font-bold -mt-32 text-gray-900 group-hover:text-white pl-7">
                  {service.name}
                </h2>
                <p className="text-gray-500 mb-1 lg:h-14 xl:h-auto group-hover:text-white pl-7 font-semibold">
                  {service.short_description}
                </p>
                <p className="text-gray-900 mb-1 group-hover:text-white pl-7 font-semibold">
                  <span className="font-semibold">Service Duration:</span>{" "}
                  {service.duration} minutes
                </p>
                <p className="text-gray-900 mb-4 group-hover:text-white pl-7 font-semibold">
                  <span className="font-semibold">Service Cost:</span> $
                  {service.price}.00
                </p>
                <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold group-hover:bg-white group-hover:text-primary w-32 ml-7">
                  View Service
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
