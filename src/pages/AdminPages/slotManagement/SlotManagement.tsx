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
import { format, isBefore, parse, parseISO } from "date-fns";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CiCircleMore } from "react-icons/ci";
import { TbArrowsExchange } from "react-icons/tb";
import { ImSpinner6 } from "react-icons/im";

const SlotManagement = () => {
  const [modalType, setModalType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const [updateSlotStatus] = useUpdateSlotStatusMutation();

  const { data, isLoading } = useGetSlotsQuery({
    page: currentPage,
    limit: dataPerPage,
  });

  const { data: allSlotsData } = useGetSlotsQuery({
    page: 1,
    limit: 1000,
  });

  const today = new Date();

  const pastSlots = allSlotsData?.slotData?.filter((item: TSlotAppointment) => {
    const slotDate = parseISO(item?.date);
    return isBefore(slotDate, today);
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

  const handlePastSlotStatus = async () => {
    setLoadingSpinner(true);
    if (pastSlots?.length === 0) {
      toast.error("No Past Slots Available");
      setLoadingSpinner(false);
      return;
    }

    try {
      let lastResponse;

      for (const slot of pastSlots) {
        const options = {
          id: slot?._id,
          data: {
            isBooked: "cancelled",
          },
        };

        lastResponse = await updateSlotStatus(options).unwrap();
      }

      console.log("Last booking response:", lastResponse);

      if (lastResponse?.success) {
        toast.success("Past slots status updated successfully");
        setLoadingSpinner(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingSpinner(false);
      // toast.error(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10">
      <SectionTitle
        sub="Quick Insights & Management Tools"
        heading="Slot Management"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        className="flex items-center justify-between mb-12 mt-10"
      >
        <h1 className="text-left font-bold text-2xl lg:text-3xl">
          All Services Slots
        </h1>
        <div>
          <div className="dropdown dropdown-left">
            <label tabIndex={0} className="m-1 cursor-pointer">
              <CiCircleMore className="text-4xl text-primary" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-md bg-base-100 rounded-box w-56 space-y-2"
            >
              <li>
                <label
                  htmlFor="createSlot-modal"
                  onClick={() => {
                    setModalType("add");
                  }}
                  className="flex items-center gap-2 btn-custom-two text-primary"
                >
                  <FaPlus className="text-xl mr-1" />
                  <span className="mt-1">Create New Slots</span>
                </label>
              </li>

              <li>
                <button
                  onClick={handlePastSlotStatus}
                  className="flex items-center gap-2 btn-custom-two text-primary"
                >
                  {loadingSpinner ? (
                    <ImSpinner6 className="animate-spin m-auto text-xl text-primary" />
                  ) : (
                    <>
                      <TbArrowsExchange className="text-xl mr-1" />
                      <span>Change Past Slot Status</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
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
                      {convertTo12HourFormat(singleSlot?.startTime)}
                    </td>
                    <td className="font-semibold text-lg">
                      {convertTo12HourFormat(singleSlot?.endTime)}
                    </td>
                    <td className="font-semibold text-lg flex justify-center items-center">
                      {singleSlot?.isBooked === "available" ? (
                        <a
                          onClick={() => handleMakeCancelled(singleSlot?._id)}
                          href="#"
                          className="bg-green-300 hover:bg-green-400 py-2 px-2 rounded-lg"
                        >
                          Available
                        </a>
                      ) : singleSlot?.isBooked === "booked" ? (
                        <a
                          href="#"
                          className="bg-blue-300 hover:bg-blue-400 py-2 px-2 rounded-lg cursor-not-allowed"
                        >
                          Booked
                        </a>
                      ) : (
                        <a
                          onClick={() => handleMakeAvailable(singleSlot?._id)}
                          href="#"
                          className="bg-red-300 hover:bg-red-400 py-2 px-2 rounded-lg"
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

      {modalType === "add" && <CreateSlotModal setModalType={setModalType} />}
    </div>
  );
};

export default SlotManagement;
