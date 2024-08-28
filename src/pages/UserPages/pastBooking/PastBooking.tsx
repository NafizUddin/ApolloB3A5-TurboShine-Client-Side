import { format, isBefore, parse, parseISO } from "date-fns";
import { useGetIndividualBookingQuery } from "../../../redux/features/bookings/bookings.api";
import Loading from "../../../components/Loading";
import SectionTitle from "../../../components/SectionTitle";
import { useState } from "react";
import { TBooking } from "../../../types/booking.type";

const PastBooking = () => {
  const { data, isLoading } = useGetIndividualBookingQuery(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const today = new Date();

  // Helper function to format dates to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return format(date, "d MMMM, yyyy");
  };

  const pastBookings = data?.filter((item: any) => {
    const slotDate = parseISO(item?.slot?.date);
    return isBefore(slotDate, today);
  });

  if (isLoading) {
    return <Loading />;
  }

  const convertTo12HourFormat = (time24: string): string => {
    // Parse the 24-hour time string into a Date object
    const date = parse(time24, "HH:mm", new Date());

    // Format the Date object into a 12-hour time string with AM/PM
    return format(date, "hh:mm a");
  };

  console.log(pastBookings);

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading={`Bookings before ${formatDate(today)}`}
      />

      <div className="flex items-center justify-between mb-12 mt-10">
        <h1 className="text-left font-bold text-2xl lg:text-3xl">
          Previous Bookings
        </h1>
      </div>

      <div
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
            {pastBookings?.length > 0 &&
              pastBookings?.map((singleBooking: TBooking, index: number) => (
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
                    {`${convertTo12HourFormat(singleBooking?.slot?.startTime)} -
                        ${convertTo12HourFormat(singleBooking?.slot?.endTime)}`}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastBooking;
