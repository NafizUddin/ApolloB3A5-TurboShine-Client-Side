import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { useGetAllBookingsQuery } from "../../../redux/features/bookings/bookings.api";
import Loading from "../../../components/Loading";
import { TBooking } from "../../../types/booking.type";
import { format, parse } from "date-fns";
import { motion } from "framer-motion";

const AllBookingsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const { data, isLoading } = useGetAllBookingsQuery({
    page: currentPage,
    limit: dataPerPage,
  });

  const totalPagesArray = [...Array(data?.meta.totalPage).keys()];

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

  const convertTo12HourFormat = (time24: string): string => {
    // Parse the 24-hour time string into a Date object
    const date = parse(time24, "HH:mm", new Date());

    // Format the Date object into a 12-hour time string with AM/PM
    return format(date, "hh:mm a");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="All Bookings Management"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="flex items-center justify-between mb-12 mt-10"
      >
        <h1 className="text-left font-bold text-2xl lg:text-3xl">
          All Bookings
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          overflowY: "auto" /* Enable scrolling */,
        }}
        className="overflow-x-auto m-5"
      >
        <table className="table">
          {/* head */}
          <thead className="text-lg">
            <tr>
              <th>No.</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.bookingData?.length > 0 &&
              data?.bookingData?.map(
                (singleBooking: TBooking, index: number) => (
                  <tr key={index} className="rounded-lg">
                    <th className="text-lg">
                      {index + 1 + (currentPage - 1) * dataPerPage}
                    </th>
                    <td className="text-lg font-semibold">
                      {singleBooking?.customer?.name}
                    </td>
                    <td className="text-lg font-semibold">
                      {singleBooking?.service?.name}
                    </td>
                    <td className="text-lg font-semibold">
                      {singleBooking?.slot?.date}
                    </td>
                    <td className="font-semibold text-lg">
                      {`${convertTo12HourFormat(
                        singleBooking?.slot?.startTime
                      )} -
                        ${convertTo12HourFormat(singleBooking?.slot?.endTime)}`}
                    </td>
                    <td className="font-semibold text-lg flex justify-center items-center">
                      <a
                        href="#"
                        className="bg-green-300 hover:bg-green-400 py-2 px-2 rounded-lg"
                      >
                        Paid
                      </a>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </motion.div>

      <div className="flex justify-center items-center flex-wrap mt-8">
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
  );
};

export default AllBookingsManagement;
