import { FaPlus } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import { useState } from "react";
import CreateSlotModal from "../../../components/CreateSlotModal";
import {
  useGetSlotsQuery,
  useUpdateSlotStatusMutation,
} from "../../../redux/features/slots/slots.api";
import { TSlotAppointment } from "../../../types/slot.type";
import Loading from "../../../components/Loading";
import { format, parse } from "date-fns";
import toast from "react-hot-toast";

const SlotManagement = () => {
  const [modalType, setModalType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const [updateSlotStatus] = useUpdateSlotStatusMutation();

  const { data, isLoading } = useGetSlotsQuery({
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

  const handleMakeAvailable = async (id: string) => {
    const options = {
      id,
      data: {
        isBooked: "available",
      },
    };

    await toast.promise(updateSlotStatus(options).unwrap(), {
      loading: "Updating status...",
      success: (res) => {
        if (res.success) {
          return res.message;
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to update status",
    });
  };
  const handleMakeCancelled = async (id: string) => {
    const options = {
      id,
      data: {
        isBooked: "cancelled",
      },
    };

    await toast.promise(updateSlotStatus(options).unwrap(), {
      loading: "Updating status...",
      success: (res) => {
        if (res.success) {
          return res.message;
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to update status",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log(data?.slotData);

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Slot Management"
      />

      <div className="flex items-center justify-between mb-12 mt-10">
        <h1 className="text-left font-bold text-2xl lg:text-3xl">
          All Services Slots
        </h1>
        <label
          htmlFor="createSlot-modal"
          onClick={() => {
            setModalType("add");
          }}
          className="flex items-center gap-2 px-4 py-3 btn-custom rounded-full text-white bg-primary"
        >
          <FaPlus className="text-xl mr-1" />
          <span className="mt-1">Create New Slots</span>
        </label>
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
              <th>Service Name</th>
              <th>Slot Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.slotData?.length > 0 &&
              data?.slotData?.map(
                (singleSlot: TSlotAppointment, index: number) => (
                  <tr key={index} className="rounded-lg">
                    <th className="text-lg">
                      {index + 1 + (currentPage - 1) * dataPerPage}
                    </th>
                    <td className="text-lg font-semibold">
                      {singleSlot?.service?.name}
                    </td>
                    <td className="text-lg font-semibold">
                      {singleSlot?.date}
                    </td>
                    <td className="font-semibold text-lg">
                      ${convertTo12HourFormat(singleSlot?.startTime)}
                    </td>
                    <td className="font-semibold text-lg">
                      {convertTo12HourFormat(singleSlot?.endTime)}
                    </td>
                    <td className="font-semibold text-lg flex justify-center items-center">
                      {singleSlot?.isBooked === "available" ? (
                        <a
                          onClick={() => handleMakeCancelled(singleSlot?._id)}
                          href="#"
                          className="bg-green-200 hover:bg-green-300 py-2 px-2 rounded-lg"
                        >
                          Available
                        </a>
                      ) : singleSlot?.isBooked === "booked" ? (
                        <a
                          href="#"
                          className="bg-blue-200 hover:bg-blue-300 py-2 px-2 rounded-lg cursor-not-allowed"
                        >
                          Booked
                        </a>
                      ) : (
                        <a
                          onClick={() => handleMakeAvailable(singleSlot?._id)}
                          href="#"
                          className="bg-red-200 hover:bg-red-300 py-2 px-2 rounded-lg"
                        >
                          Cancelled
                        </a>
                      )}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>

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

      {modalType === "add" && <CreateSlotModal setModalType={setModalType} />}
    </div>
  );
};

export default SlotManagement;
