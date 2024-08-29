import { useGetIndividualBookingQuery } from "../redux/features/bookings/bookings.api";
import { isAfter, isToday, parseISO } from "date-fns";
import useUserDetails from "./useUserDetails";

const useImmediateBooking = () => {
  const { loadedUser } = useUserDetails();

  const { data, isLoading: isBookingLoading } =
    useGetIndividualBookingQuery(undefined);

  const today = new Date();

  const upcomingBookings = data?.filter((item: any) => {
    const slotDate = parseISO(item?.slot?.date);
    return isToday(slotDate) || isAfter(slotDate, today);
  });

  const immediateBooking = upcomingBookings?.[0];
  let expiryTimestamp;

  if (immediateBooking) {
    const slotDate = parseISO(immediateBooking?.slot?.date); // Ensure slot date is in ISO format

    if (slotDate && immediateBooking?.slot?.startTime) {
      const startTime = immediateBooking?.slot?.startTime; // expected to be in "HH:mm" format

      if (startTime) {
        // Parse time using date-fns
        const [hours, minutes] = startTime.split(":").map(Number);

        // Combine date and time into a single Date object
        expiryTimestamp = new Date(slotDate);
        expiryTimestamp.setHours(hours, minutes, 0, 0);
      }
    }
  }

  // Add a nullish check for loadedUser
  if (loadedUser?.length > 0) {
    if (immediateBooking?.customer?._id !== loadedUser[0]?._id) {
      return {
        immediateBooking: null,
      };
    }
  }

  return { immediateBooking, expiryTimestamp, isBookingLoading };
};

export default useImmediateBooking;
