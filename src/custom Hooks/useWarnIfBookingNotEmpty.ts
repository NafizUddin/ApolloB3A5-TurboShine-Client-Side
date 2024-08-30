import { useAppSelector } from "../redux/hooks";
import { useEffect } from "react";

const useWarnIfBookingNotEmpty = () => {
  const { slotInfo } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (slotInfo.length > 0) {
        const message =
          "You have items in your booking. Are you sure you want to leave?";
        event.returnValue = message; // For most browsers
        return message; // For older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [slotInfo]);
};

export default useWarnIfBookingNotEmpty;
