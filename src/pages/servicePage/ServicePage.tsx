import { useGetServicesQuery } from "../../redux/features/services/carService.api";
import SectionTitle from "../../components/SectionTitle";
import { TCarService } from "../../types/carService.type";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdAvTimer } from "react-icons/md";
import Slider from "react-slider";
import { FaSort } from "react-icons/fa";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import ServiceComparisonModal from "../../components/ServiceComparisonModal";
import useWarnIfBookingNotEmpty from "../../custom Hooks/useWarnIfBookingNotEmpty";

const priceRanges = ["0-500", "501-1000", "1001-1500"];

interface QueryObj {
  searchTerm?: string;
  minValue?: number;
  maxValue?: number;
  priceRanges?: Array<{ start: number; end: number }>;
  selectedSort?: string;
}

type TServiceState = TCarService | null;

const ServicePage = () => {
  useWarnIfBookingNotEmpty();
  const [searchTerm, setSearchTerm] = useState("");
  const [isResetButtonEnabled, setIsResetButtonEnabled] = useState(false);
  const [minTime, setMinTime] = useState(10);
  const [maxTime, setMaxTime] = useState(120);
  const [selectedSort, setSelectedSort] = useState("");
  const [modalType, setModalType] = useState<string>("");
  const [service, setService] = useState<TServiceState[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const [checkedState, setCheckedState] = useState(
    priceRanges.reduce((acc, range) => {
      acc[range] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Memoized query object
  const queryObj: QueryObj = useMemo(() => {
    const selectedPriceRanges = priceRanges
      .filter((range) => checkedState[range])
      .map((range) => {
        const [min, max] = range.split("-").map(Number);
        return { start: min, end: max };
      });

    return {
      searchTerm,
      minTime,
      maxTime,
      priceRanges: selectedPriceRanges.length ? selectedPriceRanges : undefined,
      selectedSort,
      page: currentPage,
      limit: dataPerPage,
    };
  }, [
    searchTerm,
    minTime,
    maxTime,
    checkedState,
    selectedSort,
    currentPage,
    dataPerPage,
  ]);

  const { data, isLoading } = useGetServicesQuery(queryObj);

  const { data: allServicesForTags } = useGetServicesQuery({});

  const totalPagesArray = [...Array(data?.meta?.totalPage).keys()];

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  const handleSearchService = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search") as string;
    setSearchTerm(searchValue);
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

  const handleSliderChange = (values: number[]) => {
    setIsResetButtonEnabled(true);
    setMinTime(values[0]);
    setMaxTime(values[1]);
  };

  const toggleService = (singleService: TCarService) => {
    setService((prevServices) => {
      const isServiceSelected = prevServices?.some(
        (selectedService) => selectedService?._id === singleService?._id
      );

      if (isServiceSelected) {
        // Remove service if already selected
        return prevServices?.filter(
          (selectedService) => selectedService?._id !== singleService?._id
        );
      } else {
        // Add service if not selected
        return [...(prevServices || []), singleService];
      }
    });
  };

  const handleCurrentPage = async (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPagesArray.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleReset = () => {
    const resetState = Object.keys(checkedState).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setCheckedState(resetState);
    setIsResetButtonEnabled(false);
    setMinTime(10);
    setMaxTime(120);
    setSearchTerm("");
    setService([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-10">
      <SectionTitle
        sub="OUR RANGE OF SERVICES"
        heading="Top-Tier Car Solutions"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-7 gap-9 mt-44">
        <div className="lg:col-span-1 xl:col-span-2 -mt-28 mb-40">
          {/* Search Bar starts*/}
          <form
            onSubmit={handleSearchService}
            className="md:max-w-md mx-auto w-4/5"
          >
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
                name="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-gray-900 rounded-lg border border-gray-300 outline-none transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
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
              <h1 className="text-2xl font-semibold">Filter by Price Ranges</h1>
            </div>

            <div className="flex flex-col gap-3 mt-5 ml-[58px] md:ml-[230px] lg:ml-0">
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
                    <span className="select-none ml-4 md:ml-3 text-2xl font-medium mt-1">
                      ${range}.00
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Filter by price ends*/}

          {/* time duration slider starts*/}
          <div className="mt-7 space-y-7">
            <div className="flex gap-3 items-center justify-center lg:justify-start">
              <MdAvTimer className="text-3xl" />
              <h1 className="text-2xl mt-2 font-semibold">
                Service Time Duration
              </h1>
            </div>

            <Slider
              className="slider w-4/5 md:w-3/5 mx-auto lg:w-full"
              min={10}
              max={120}
              step={1} // adjust step value for finer control
              value={[minTime, maxTime]}
              onChange={handleSliderChange}
            />

            <p className="text-lg md:text-xl font-medium text-center lg:text-left">
              Time Range: {minTime} minutes - {maxTime} minutes
            </p>
          </div>

          {/* time duration slider ends*/}
          {/* Tag type start */}
          <div className="mt-7">
            <div className="container mx-auto">
              <div className="bg-white rounded-lg">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center lg:text-left">
                  Compare Services
                </h2>

                <div className="flex justify-center lg:justify-start flex-wrap gap-2">
                  {allServicesForTags?.serviceData?.map(
                    (singleService: TCarService, index: number) => {
                      const backgroundColors = [
                        "bg-blue-200",
                        "bg-green-200",
                        "bg-yellow-200",
                      ];
                      const hoverColors = [
                        "bg-blue-300",
                        "bg-green-300",
                        "bg-yellow-300",
                      ];
                      const backgroundColorIndex = index % 3;
                      const hoverColorIndex = index % 3;

                      const isServiceSelected = service?.some(
                        (selectedService) =>
                          selectedService?._id === singleService?._id
                      );

                      return (
                        <div
                          key={singleService._id}
                          className={`relative flex items-center gap-2 ${backgroundColors[backgroundColorIndex]} hover:${hoverColors[hoverColorIndex]} py-1 px-2 rounded-lg cursor-pointer`}
                          onClick={() => toggleService(singleService)}
                        >
                          {singleService.name}
                          {isServiceSelected && (
                            <span
                              className="text-red-500"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent parent div click from triggering
                                toggleService(singleService);
                              }}
                            >
                              X
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Compare button */}
          <div className="mt-7 flex justify-center items-center lg:justify-start">
            <button
              className={`px-4 py-2 rounded ${
                service.length > 1
                  ? "bg-primary btn-custom text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 btn btn-disabled"
              }`}
            >
              <label
                onClick={() => {
                  setModalType("add");
                }}
                htmlFor="comparison-modal"
              >
                Compare
              </label>
            </button>
          </div>

          <div className="mt-7 flex justify-center items-center lg:justify-start">
            <button
              onClick={handleReset}
              disabled={!isResetButtonEnabled}
              className={`mt-5 px-4 py-2 rounded ${
                isResetButtonEnabled
                  ? "bg-primary btn-custom text-white cursor-pointer"
                  : "btn btn-disabled"
              }`}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-span-5">
          <div className="flex justify-start items-center text-xl font-semibold -mt-28 mb-44 pl-7">
            <FaSort />
            <select
              value={selectedSort}
              onChange={handleSelectChange}
              className="mt-2"
            >
              <option value="">Select Sorting Option</option>
              <optgroup label="Sort By Price">
                <option value="price-ascending">Low to High (Price)</option>
                <option value="price-descending">High to Low (Price)</option>
              </optgroup>
              <optgroup label="Sort By Duration">
                <option value="duration-ascending">
                  Low to High (Duration)
                </option>
                <option value="duration-descending">
                  High to Low (Duration)
                </option>
              </optgroup>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data?.serviceData?.map((service: TCarService, index: number) => (
              <motion.div
                key={service._id}
                className="rounded-lg card p-6 bg-white mb-40 group flex flex-col"
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
                <h2 className="text-2xl font-bold -mt-32 flex-grow xl:h-auto text-gray-900 group-hover:text-white pl-7">
                  {service.name}
                </h2>
                <p className="text-gray-500 mb-1 flex-grow xl:h-auto group-hover:text-white pl-7 font-semibold">
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
                <Link to={`/serviceDetails/${service._id}`}>
                  <button className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold group-hover:bg-white group-hover:text-primary w-32 ml-7">
                    View Service
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center items-center flex-wrap">
            {totalPagesArray?.length > 1 && (
              <div className="join pb-10">
                <button onClick={handlePrevPage} className="join-item btn">
                  Previous
                </button>
                {totalPagesArray?.map((page) => (
                  <button
                    key={page}
                    onClick={() => handleCurrentPage(page)}
                    className={
                      currentPage === page + 1
                        ? "join-item btn selected bg-primary text-white"
                        : "join-item btn"
                    }
                  >
                    {page + 1}
                  </button>
                ))}
                <button onClick={handleNextPage} className="join-item btn">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {modalType === "add" && (
        <ServiceComparisonModal
          service={service}
          setService={setService}
          setModalType={setModalType}
        />
      )}
    </div>
  );
};

export default ServicePage;
