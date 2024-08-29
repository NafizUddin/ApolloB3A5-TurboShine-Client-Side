import { format, isBefore, parse, parseISO } from "date-fns";
import { useGetIndividualBookingQuery } from "../../../redux/features/bookings/bookings.api";
import Loading from "../../../components/Loading";
import SectionTitle from "../../../components/SectionTitle";
import { useState } from "react";
import { TBooking } from "../../../types/booking.type";
import { motion } from "framer-motion";

const PastBooking = () => {
  const { data, isLoading } = useGetIndividualBookingQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const today = new Date();

  // Helper function to format dates to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return format(date, "d MMMM, yyyy");
  };

  const pastBookings = data?.filter((item: any) => {
    const slotDate = parseISO(item?.slot?.date);
    return isBefore(slotDate, today);
  });

  const totalPages =
    pastBookings && pastBookings.length > 0
      ? Math.ceil(pastBookings.length / dataPerPage)
      : 1;

  const totalPagesArray = [...Array(totalPages).keys()];

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

  const paginatedBookings = pastBookings?.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  const convertTo12HourFormat = (time24: string): string => {
    // Parse the 24-hour time string into a Date object
    const date = parse(time24, "HH:mm", new Date());

    // Format the Date object into a 12-hour time string with AM/PM
    return format(date, "hh:mm a");
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log(pastBookings);

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading={`Bookings before ${formatDate(today)}`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="flex items-center justify-between mb-12 mt-10"
      >
        <h1 className="text-left font-bold text-2xl lg:text-3xl">
          Previous Bookings
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
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings?.length > 0 &&
              paginatedBookings?.map(
                (singleBooking: TBooking, index: number) => (
                  <tr key={index} className="rounded-lg">
                    <th className="text-lg">
                      {index + 1 + (currentPage - 1) * dataPerPage}
                    </th>
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

export default PastBooking;
