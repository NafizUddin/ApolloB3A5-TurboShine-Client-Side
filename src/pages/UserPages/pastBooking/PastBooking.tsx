import { format, isBefore, parseISO, startOfDay } from "date-fns";
import { useGetIndividualBookingQuery } from "../../../redux/features/bookings/bookings.api";
import Loading from "../../../components/Loading";
import SectionTitle from "../../../components/SectionTitle";

const PastBooking = () => {
  const { data, isLoading } = useGetIndividualBookingQuery(undefined);

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
    </div>
  );
};

export default PastBooking;
