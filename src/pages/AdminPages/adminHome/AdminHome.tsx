import { useGetAllUsersQuery } from "../../../redux/features/auth/authApi";
import SectionTitle from "../../../components/SectionTitle";
import { useGetServicesQuery } from "../../../redux/features/services/carService.api";
import { useGetSlotsQuery } from "../../../redux/features/slots/slots.api";
import { GrServices } from "react-icons/gr";
import { FaCheckToSlot } from "react-icons/fa6";
import { motion } from "framer-motion";

const AdminHome = () => {
  const queryObj = {
    searchTerm: "",
    minTime: 0,
    maxTime: 120,
    priceRanges: [],
    selectedSort: "",
  };

  const _queryObj = {
    dateRange: [],
    serviceId: "",
  };

  const { data: allServices } = useGetServicesQuery(queryObj);
  const { data: allStudents } = useGetAllUsersQuery(undefined);
  const { data: slotInfo } = useGetSlotsQuery(_queryObj);

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Dashboard Overview"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.4,
        }}
        className="w-full flex justify-center items-center mt-5 lg:mt-10 xl:mt-32"
      >
        <div>
          <div className="m-6">
            <div className="flex flex-wrap -mx-6">
              <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 h-[130px]">
                  <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                    <svg
                      className="h-8 w-8 text-white"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {allStudents?.meta?.total}
                    </h4>
                    <div className="text-gray-500 text-lg">Total Users</div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 h-[130px]">
                  <div className="p-3 rounded-full bg-orange-600 bg-opacity-75">
                    <GrServices className="h-8 w-8 text-white" />
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {allServices?.meta?.total}
                    </h4>
                    <div className="text-gray-500 text-lg">Total Services</div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-slate-100 h-[130px]">
                  <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                    <FaCheckToSlot className="h-8 w-8 text-white" />
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {slotInfo?.meta?.total}
                    </h4>
                    <div className="text-gray-500 text-lg">
                      Total Service Slots
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
