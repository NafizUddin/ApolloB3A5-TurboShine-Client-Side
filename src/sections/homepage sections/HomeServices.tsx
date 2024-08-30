import { useGetServicesQuery } from "../../redux/features/services/carService.api";
import SectionTitle from "../../components/SectionTitle";
import { TCarService } from "../../types/carService.type";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HomeServices = () => {
  const queryObj = {
    searchTerm: "",
    minTime: 0,
    maxTime: 120,
    priceRanges: [],
    selectedSort: "",
  };

  const { data, isLoading } = useGetServicesQuery(queryObj);

  const ref = useRef(null);

  // Use the useInView hook with the ref
  const isInView = useInView(ref);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-28">
      <SectionTitle sub="SERVICES WE PROVIDE" heading="Our Service Area" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-40"
      >
        {data?.serviceData
          ?.slice(0, 6)
          ?.map((service: TCarService, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              key={service._id}
              className="rounded-lg card p-6 bg-white mb-40 group shadow-md flex flex-col"
            >
              <img
                src={service.image}
                className="rounded-lg mb-4 relative -top-36 object-cover w-[350px] h-[243px] mx-auto"
              />
              <h2 className="text-2xl font-bold -mt-32 flex-grow text-gray-900 group-hover:text-white pl-7">
                {service.name}
              </h2>
              <p className="text-gray-500 mb-4 flex-grow group-hover:text-white pl-7 font-semibold">
                {service.short_description}
              </p>
              <Link to={`/serviceDetails/${service._id}`}>
                <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold group-hover:bg-white group-hover:text-primary w-32 ml-7">
                  View Service
                </button>
              </Link>
            </motion.div>
          ))}
      </motion.div>

      {data?.serviceData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-2 relative -top-24"
        >
          <Link to="/services">
            <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold flex items-center gap-1">
              <span>View All Services</span>
              <FaLongArrowAltRight className="mb-1" />
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default HomeServices;
