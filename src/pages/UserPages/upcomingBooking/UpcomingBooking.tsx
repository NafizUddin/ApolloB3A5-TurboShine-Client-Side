import { useGetIndividualBookingQuery } from "../../../redux/features/bookings/bookings.api";
import SectionTitle from "../../../components/SectionTitle";
import { parseISO, isAfter, parse, format } from "date-fns";
import Loading from "../../../components/Loading";
import { TBooking } from "@/types/booking.type";
import Timer from "../../../components/Timer";
import { motion } from "framer-motion";
import useWarnIfBookingNotEmpty from "../../../custom Hooks/useWarnIfBookingNotEmpty";

const UpcomingBooking = () => {
  useWarnIfBookingNotEmpty();
  const { data, isLoading } = useGetIndividualBookingQuery(undefined);

  const now = new Date();

  const upcomingBookings = data?.filter((item: any) => {
    const slotStartDateTime = parseISO(
      `${item?.slot?.date}T${item?.slot?.startTime}:00`
    ); // Adding seconds for a complete time

    return isAfter(slotStartDateTime, now);
  });

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
        heading="Upcoming Bookings"
      />

      {upcomingBookings?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {upcomingBookings?.map((booking: TBooking, index: number) => {
            const slotDate = parseISO(booking?.slot?.date); // Ensure slot date is in ISO format

            // Extract time components as strings
            const startTime = booking?.slot?.startTime; // expected to be in "HH:mm" format

            // Parse time using date-fns
            const [hours, minutes] = startTime.split(":").map(Number);

            // Combine date and time into a single Date object
            const expiryTimestamp = new Date(slotDate);
            expiryTimestamp.setHours(hours, minutes, 0, 0);

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
                key={index}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col"
              >
                <h3 className="text-xl font-bold mb-2">
                  {booking?.service?.name}
                </h3>
                <p className="text-gray-700 mb-4 flex-grow">
                  {booking?.service?.short_description}
                </p>
                <p className="text-gray-500">Date: {booking?.slot?.date}</p>
                <p className="text-gray-500">
                  Time: {convertTo12HourFormat(booking?.slot?.startTime)} -{" "}
                  {convertTo12HourFormat(booking?.slot?.endTime)}
                </p>
                <Timer expiryTimestamp={expiryTimestamp} />
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p>No upcoming bookings.</p>
      )}
    </div>
  );
};

export default UpcomingBooking;
