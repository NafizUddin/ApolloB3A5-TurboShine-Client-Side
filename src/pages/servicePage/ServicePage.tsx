import { useGetServicesQuery } from "../../redux/features/services/carService.api";
import SectionTitle from "../../components/SectionTitle";
import { TCarService } from "../../types/carService.type";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const priceRanges = ["0-500", "501-1000", "1001-1500"];

const ServicePage = () => {
  const { data: serviceData } = useGetServicesQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [isResetButtonEnabled, setIsResetButtonEnabled] = useState(false);
  const [checkedState, setCheckedState] = useState(
    priceRanges.reduce((acc, range) => {
      acc[range] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsResetButtonEnabled(true);
    event.currentTarget.reset();
  };

  const handleCheckboxChange = (range: string) => {
    setCheckedState((prevState) => {
      const newState = {
        ...prevState,
        [range]: !prevState[range],
      };
      setIsResetButtonEnabled(
        Object.values(newState).some((checked) => checked)
      );
      return newState;
    });
  };

  return (
    <div className="my-10">
      <SectionTitle
        sub="OUR RANGE OF SERVICES"
        heading="Top-Tier Car Solutions"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-7 gap-5 mt-44">
        <div className="lg:col-span-1 xl:col-span-2 -mt-28 mb-40">
          {/* Search Bar starts*/}
          <form onSubmit={handleSearchProduct} className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#033955]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="default-search"
                onBlur={handleInputChange}
                className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg border border-gray-300 outline-none transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder="Search Products..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-white hover:text-primary outline font-medium rounded-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
          {/* Search Bar Ends */}

          {/* Filter by price starts*/}
          <div className="mt-7">
            <div className="flex gap-3 justify-center lg:justify-start items-center">
              <RiMoneyDollarCircleLine className="text-3xl mb-2" />
              <h1 className="text-xl md:text-2xl font-semibold">
                Filter by Price Ranges
              </h1>
            </div>

            <div className="flex flex-col gap-3 mt-5 ml-24 md:ml-72 lg:ml-0">
              {priceRanges.map((range) => (
                <div key={range}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={checkedState[range]}
                      onChange={() => handleCheckboxChange(range)}
                    />
                    <span
                      className={`w-6 h-6 inline-block rounded-full border-2 ${
                        checkedState[range]
                          ? "border-primary bg-primary"
                          : "border-gray-400"
                      } flex items-center justify-center cursor-pointer mb-1`}
                    >
                      {checkedState[range] && (
                        <svg
                          className="w-4 h-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="select-none ml-3 text-xl font-medium mt-1">
                      ${range}.00
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Filter by price ends*/}
          {/* Tag type start */}
          <body className="mt-5">
            <div className="container mx-auto">
              <div className="bg-white rounded-lg">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center lg:text-left">
                  Tag Cloud
                </h2>
                <div className="flex justify-center lg:justify-start flex-wrap gap-2">
                  <a
                    href="#"
                    className="bg-blue-200 hover:bg-blue-300 py-1 px-2 rounded-lg text-lg"
                  >
                    Car Care
                  </a>
                  <a
                    href="#"
                    className="bg-green-200 hover:bg-green-300 py-1 px-2 rounded-lg text-lg"
                  >
                    Tire Services
                  </a>
                  <a
                    href="#"
                    className="bg-yellow-200 hover:bg-yellow-300 py-1 px-2 rounded-lg text-lg"
                  >
                    Oil Change
                  </a>
                  <a
                    href="#"
                    className="bg-indigo-200 hover:bg-indigo-300 py-1 px-2 rounded-lg text-lg"
                  >
                    Brake Service
                  </a>
                  <a
                    href="#"
                    className="bg-purple-200 hover:bg-purple-300 py-1 px-2 rounded-lg text-lg"
                  >
                    Interior Cleaning
                  </a>
                  <a
                    href="#"
                    className="bg-pink-200 hover:bg-pink-300 py-1 px-2 rounded-lg text-lg"
                  >
                    Car Customization
                  </a>
                </div>
              </div>
            </div>
          </body>
          {/* Tag type ends */}
        </div>
        <div className="lg:col-span-2 xl:col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceData?.map((service: TCarService, index: number) => (
              <motion.div
                key={service._id}
                className="rounded-lg card p-6 bg-white mb-40 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
              >
                <img
                  src={service.image}
                  className="rounded-lg mb-4 relative -top-36 object-cover w-[350px] h-[243px] mx-auto"
                />
                <h2 className="text-2xl font-bold -mt-32 lg:h-20 xl:h-auto text-gray-900 group-hover:text-white pl-7">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
