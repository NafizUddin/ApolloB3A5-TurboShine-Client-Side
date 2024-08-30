import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Loading from "../../components/Loading";
import { useGetSingleServiceQuery } from "../../redux/features/services/carService.api";
import { Link, useParams } from "react-router-dom";
import { LuClock } from "react-icons/lu";
import { FaCheckToSlot } from "react-icons/fa6";
import { useEffect, useMemo, useState } from "react";
import { useGetSlotsQuery } from "../../redux/features/slots/slots.api";
import { TSlotAppointment } from "@/types/slot.type";
import { DayPicker } from "react-day-picker";
import { format, startOfDay, isSameDay, isBefore } from "date-fns";
import "react-day-picker/dist/style.css";
import { FaTimesCircle } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { addBooking } from "../../redux/features/bookings/bookings.slice";
import toast from "react-hot-toast";
import useUserDetails from "../../custom Hooks/useUserDetails";
import { motion } from "framer-motion";
import useWarnIfBookingNotEmpty from "../../custom Hooks/useWarnIfBookingNotEmpty";

const ServiceDetails = () => {
  useWarnIfBookingNotEmpty();
  const { id } = useParams();
  const { loadedUser } = useUserDetails();

  const { data, isLoading } = useGetSingleServiceQuery(id);

  const serviceId = data?._id;
  const currentDate = startOfDay(new Date()); // Set to start of the day
  const [dateRange, setDateRange] = useState<string[]>([
    format(currentDate, "yyyy-MM-dd"),
  ]);

  const [selectedSlot, setSelectedSlot] = useState<TSlotAppointment[]>([]);

  const dispatch = useAppDispatch();

  // Helper function to format dates to YYYY-MM-DD
  const formatDate = (date: Date) => format(startOfDay(date), "yyyy-MM-dd");

  // Handler for day click
  const handleDayClick = (day: Date) => {
    const formattedDate = formatDate(day);
    setDateRange((prevDates) => {
      if (prevDates.length === 1 && isSameDay(new Date(prevDates[0]), day)) {
        // If the clicked date is the same as the selected date, deselect it
        return [formatDate(currentDate)]; // Reset to only currentDate
      }
      return [formatDate(currentDate), formattedDate]; // Set currentDate and selected date
    });
  };

  // Remove selected date
  const removeSelectedDate = () => {
    setDateRange([format(currentDate, "yyyy-MM-dd")]); // Reset to only currentDate
  };

  // Disable past dates and currently selected date
  const disabledDays = (date: Date) =>
    isBefore(date, currentDate) ||
    (dateRange.length > 1 && isSameDay(date, new Date(dateRange[1])));

  // Convert dateRange state to Date objects for the DayPicker
  const selectedDates = dateRange.length > 1 ? [new Date(dateRange[1])] : [];

  const handleSlotSelection = (slot: TSlotAppointment) => {
    setSelectedSlot((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (selected) => selected._id === slot._id
      );

      if (isAlreadySelected) {
        return prevSelected.filter((selected) => selected._id !== slot._id);
      } else {
        return [...prevSelected, slot];
      }
    });
  };

  const isSlotSelected = (slot: TSlotAppointment) => {
    return selectedSlot.some((selected) => selected._id === slot._id);
  };

  const queryObj = useMemo(
    () => ({
      dateRange,
      serviceId,
    }),
    [dateRange, serviceId]
  );

  const { data: serviceSlots } = useGetSlotsQuery(queryObj);

  // Convert currentDate to YYYY-MM-DD format
  const currentDateFormatted = formatDate(currentDate);

  // Filter serviceSlots into currentDateServiceSlots and otherDateServiceSlots
  const currentDateServiceSlots = serviceSlots?.slotData?.filter(
    (serviceSlot: TSlotAppointment) => serviceSlot.date === currentDateFormatted
  );

  const otherDateServiceSlots = serviceSlots?.slotData?.filter(
    (serviceSlot: TSlotAppointment) =>
      serviceSlot.date !== currentDateFormatted &&
      dateRange.includes(serviceSlot.date)
  );

  const handleBookingSlots = () => {
    dispatch(addBooking({ slotInfo: selectedSlot, totalCost: data?.price }));
    toast.success("The slot has been booked successfully.");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Service Details */}
      <div className="mt-8 mx-6 xl:mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 my-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            className="lg:col-span-4 mt-5"
          >
            <img
              src={data?.image}
              className="lg:h-[420px] xl:max-h-[370px] object-cover w-full"
              alt={data?.name}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            className="lg:col-span-2 lg:ml-6 text-center lg:text-left"
          >
            <h1 className="text-3xl font-bold mt-5 mb-2">{data?.name}</h1>
            <p className="mt-2 text-lg text-gray-500 text-left">
              {data?.description}
            </p>
            <p className="text-xl font-medium mt-3 flex items-center gap-1">
              <RiMoneyDollarCircleLine className="mb-2" />
              <span>Service Cost: ${data?.price}.00</span>
            </p>
            <p className="text-xl font-medium mt-3 flex items-center gap-1">
              <LuClock className="mb-2" />
              <span>Service Duration: {data?.duration} minutes</span>
            </p>

            {/* Other Content */}
          </motion.div>
        </div>

        <div>
          <div className="text-xl font-medium mt-3 flex items-center justify-center">
            <div className="flex items-center gap-1 text-2xl md:text-4xl font-bold">
              <FaCheckToSlot className="mb-2" />
              <span>Today's Available Slots:</span>
            </div>
          </div>
          <div>
            {serviceSlots && serviceSlots?.slotData?.length > 0 ? (
              <div className="flex items-center justify-center flex-wrap mt-4 w-4/5 mx-auto gap-1">
                {currentDateServiceSlots?.map(
                  (singleSlot: TSlotAppointment) => (
                    <li key={singleSlot._id} className="flex mx-1">
                      <a
                        onClick={() => handleSlotSelection(singleSlot)}
                        className={`p-2 px-3 mb-4 rounded font-medium ${
                          singleSlot?.isBooked === "available"
                            ? isSlotSelected(singleSlot) &&
                              loadedUser[0]?.role !== "admin"
                              ? "bg-green-500 text-white"
                              : "border-primary bg-white text-primary hover:bg-primary hover:text-white border"
                            : "btn btn-disabled"
                        } ${
                          loadedUser[0]?.role === "admin"
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {`${singleSlot?.startTime}-${singleSlot?.endTime}`}
                      </a>
                    </li>
                  )
                )}
              </div>
            ) : (
              <div className="text-2xl md:text-3xl text-center font-semibold mt-10">
                Sorry, no slots are available
              </div>
            )}

            <div className="flex justify-center items-center mt-7">
              {selectedSlot &&
                selectedSlot.length > 0 &&
                loadedUser[0]?.role !== "admin" && (
                  <div>
                    <Link to={"/bookings"}>
                      <button
                        onClick={handleBookingSlots}
                        className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold"
                      >
                        Book Services
                      </button>
                    </Link>
                  </div>
                )}
            </div>
          </div>

          <div className="mt-10 mb-20 flex flex-col justify-center items-center">
            <div>
              <div className="flex items-center gap-1 text-2xl md:text-4xl font-bold">
                <FaCheckToSlot className="mb-2" />
                <span>Upcoming Available Slots:</span>
              </div>
              <div className="mt-7 md:ml-16">
                <DayPicker
                  selected={selectedDates}
                  onDayClick={handleDayClick}
                  disabled={disabledDays}
                />
                {dateRange.length > 1 && (
                  <div className="mt-5 text-xl font-semibold text-center xl:mr-10">
                    <div className="flex items-center justify-center">
                      <h1>Selected Date: {dateRange[1]}</h1>
                      <button
                        onClick={removeSelectedDate}
                        className="ml-2 pb-1 text-primary text-xl"
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              {otherDateServiceSlots && otherDateServiceSlots.length > 0 ? (
                <div>
                  <div className="flex items-center justify-center flex-wrap mt-4 w-4/5 mx-auto gap-1">
                    {otherDateServiceSlots?.map(
                      (singleSlot: TSlotAppointment) => (
                        <li key={singleSlot._id} className="flex mx-1">
                          <a
                            onClick={() => handleSlotSelection(singleSlot)}
                            className={`p-2 px-3 mb-4 rounded font-medium ${
                              singleSlot?.isBooked === "available"
                                ? isSlotSelected(singleSlot) &&
                                  loadedUser[0]?.role !== "admin"
                                  ? "bg-green-500 text-white"
                                  : "border-primary bg-white text-primary hover:bg-primary hover:text-white border"
                                : "btn btn-disabled"
                            } ${
                              loadedUser[0]?.role === "admin"
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {`${singleSlot?.startTime}-${singleSlot?.endTime}`}
                          </a>
                        </li>
                      )
                    )}
                  </div>

                  <div className="flex justify-center items-center mt-7">
                    {selectedSlot &&
                      selectedSlot.length > 0 &&
                      loadedUser[0]?.role !== "admin" &&
                      selectedSlot.some(
                        (serviceSlot: TSlotAppointment) =>
                          serviceSlot.date !== currentDateFormatted &&
                          dateRange.includes(serviceSlot.date)
                      ) && (
                        <div>
                          <Link to={"/bookings"}>
                            <button
                              onClick={handleBookingSlots}
                              className="px-4 py-3 text-white bg-primary rounded-lg btn-custom font-bold"
                            >
                              Book Services
                            </button>
                          </Link>
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <div className="text-2xl md:text-3xl text-center font-semibold mt-10">
                  Sorry, no slots are available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
