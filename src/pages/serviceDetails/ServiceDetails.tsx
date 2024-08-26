import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Loading from "../../components/Loading";
import { useGetSingleServiceQuery } from "../../redux/features/services/carService.api";
import { useParams } from "react-router-dom";
import { LuClock } from "react-icons/lu";
import { FaCheckToSlot } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { useGetSlotsQuery } from "../../redux/features/slots/slots.api";
import { TSlotAppointment } from "@/types/slot.type";
import { DayPicker } from "react-day-picker";
import { format, startOfDay, isSameDay, isBefore } from "date-fns";
import "react-day-picker/dist/style.css";
import { FaTimesCircle } from "react-icons/fa";

const ServiceDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleServiceQuery(id);

  const serviceId = data?._id;
  const currentDate = startOfDay(new Date()); // Set to start of the day
  const [dateRange, setDateRange] = useState<string[]>([
    format(currentDate, "yyyy-MM-dd"),
  ]);

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

  const queryObj = useMemo(
    () => ({
      dateRange,
      serviceId,
    }),
    [dateRange, serviceId]
  );

  const { data: serviceSlots } = useGetSlotsQuery(queryObj);

  if (isLoading) {
    return <Loading />;
  }

  // Convert currentDate to YYYY-MM-DD format
  const currentDateFormatted = formatDate(currentDate);

  // Filter serviceSlots into currentDateServiceSlots and otherDateServiceSlots
  const currentDateServiceSlots = serviceSlots?.filter(
    (serviceSlot: TSlotAppointment) => serviceSlot.date === currentDateFormatted
  );

  const otherDateServiceSlots = serviceSlots?.filter(
    (serviceSlot: TSlotAppointment) =>
      serviceSlot.date !== currentDateFormatted &&
      dateRange.includes(serviceSlot.date)
  );

  return (
    <div>
      {/* Service Details */}
      <div className="mt-8 mx-6 xl:mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 my-10">
          <div className="lg:col-span-4 mt-5">
            <img
              src={data?.image}
              className="max-h-[370px] object-cover w-full"
              alt={data?.name}
            />
          </div>
          <div className="lg:col-span-2 lg:ml-6 text-center lg:text-left">
            <h1 className="text-3xl font-bold mt-5 mb-2">{data?.name}</h1>
            <p className="mt-2 text-lg text-gray-500">{data?.description}</p>
            <p className="text-xl font-medium mt-3 flex items-center gap-1">
              <RiMoneyDollarCircleLine className="mb-2" />
              <span>Service Cost: ${data?.price}.00</span>
            </p>
            <p className="text-xl font-medium mt-3 flex items-center gap-1">
              <LuClock className="mb-2" />
              <span>Service Duration: {data?.duration} minutes</span>
            </p>

            {/* Other Content */}
          </div>
        </div>

        <div>
          <div className="text-xl font-medium mt-3 flex items-center justify-center">
            <div className="flex items-center gap-1 text-2xl md:text-4xl font-bold">
              <FaCheckToSlot className="mb-2" />
              <span>Today's Available Slots:</span>
            </div>
          </div>
          <div>
            {serviceSlots && serviceSlots.length > 0 ? (
              <div className="flex items-center justify-center flex-wrap mt-4 w-4/5 mx-auto gap-1">
                {currentDateServiceSlots?.map(
                  (singleSlot: TSlotAppointment) => (
                    <li key={singleSlot._id} className="flex mx-1">
                      <a
                        className={`${
                          singleSlot?.isBooked === "available"
                            ? "p-2 px-3 border-primary mb-4 rounded font-medium hover:bg-primary border bg-white text-primary hover:text-white cursor-pointer"
                            : "p-2 px-3 mb-4 rounded font-medium btn btn-disabled"
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
          </div>

          <div className="mt-10 mb-20 flex flex-col justify-center items-center">
            <div>
              <div className="flex items-center gap-1 text-2xl md:text-4xl font-bold">
                <FaCheckToSlot className="mb-2" />
                <span>Upcoming Available Slots:</span>
              </div>
              <div className="mt-7 xl:ml-16">
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

            <div className="flex items-center justify-center flex-wrap mt-4 w-4/5 mx-auto gap-1">
              {otherDateServiceSlots?.map((singleSlot: TSlotAppointment) => (
                <div key={singleSlot._id}>
                  <li className="flex mx-1">
                    <a
                      className={`${
                        singleSlot?.isBooked === "available"
                          ? "p-2 px-3 border-primary mb-4 rounded font-medium hover:bg-primary border bg-white text-primary hover:text-white cursor-pointer"
                          : "p-2 px-3 mb-4 rounded font-medium btn btn-disabled"
                      }`}
                    >
                      {`${singleSlot?.startTime}-${singleSlot?.endTime}`}
                    </a>
                  </li>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
