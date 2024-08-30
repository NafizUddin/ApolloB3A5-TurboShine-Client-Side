import { ReactNode, useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useUserDetails from "../../custom Hooks/useUserDetails";
import Loading from "../../components/Loading";
import { FaCircleXmark } from "react-icons/fa6";
import { TSlotAppointment } from "../../types/slot.type";
import {
  clearBooking,
  removeBooking,
} from "../../redux/features/bookings/bookings.slice";
import toast from "react-hot-toast";
import { useAddBookingsMutation } from "../../redux/features/bookings/bookings.api";
import { ImSpinner6 } from "react-icons/im";
import { motion } from "framer-motion";
import useWarnIfBookingNotEmpty from "../../custom Hooks/useWarnIfBookingNotEmpty";

const BookingPage = () => {
  useWarnIfBookingNotEmpty();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FieldValues>();
  const dispatch = useAppDispatch();
  const { slotInfo, totalCost } = useAppSelector((state) => state.bookings);
  const { loadedUser, isLoading } = useUserDetails();
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const [addBookings] = useAddBookingsMutation();

  const handlePlaceBooking = async () => {
    if (slotInfo.length === 0) {
      toast.error("Please add a service slot to your cart.");
      return;
    }
    setIsBookingLoading(true);

    try {
      let lastResponse;
      const transactionId = `TXN-${Date.now()}`;

      for (const slot of slotInfo) {
        const payload = {
          serviceId: slot.service._id,
          slotId: slot._id,
          paymentStatus: "Pending",
          totalBookingCost: total,
          transactionId,
        };

        lastResponse = await addBookings(payload).unwrap();
      }

      console.log("Last booking response:", lastResponse);

      if (lastResponse?.result) {
        window.location.href = lastResponse.payment_url;
      }

      toast.success("All bookings placed successfully!");
      setIsBookingLoading(false);
      dispatch(clearBooking());
    } catch (error) {
      console.error("Booking Error:", error);
      setIsBookingLoading(false);
      toast.error("Failed to place booking. Please try again.");
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeBooking(id));
    toast.success("Service Slot removed successfully!");
  };

  const total = totalCost + 11;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-10">
      <SectionTitle
        sub="REVIEW BOOKED SERVICES AND PAY"
        heading="Complete Your Booking"
      />

      <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit(handlePlaceBooking)}
          className="max-w-2xl mx-auto lg:max-w-none"
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              className="mt-10 lg:mt-0"
            >
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Booking Summary
              </h2>

              <div>
                {slotInfo.length > 0 ? (
                  <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div>
                      {slotInfo.length > 0 &&
                        slotInfo.map((singleSlot: TSlotAppointment) => (
                          <div key={singleSlot._id}>
                            <ul
                              role="list"
                              className="divide-y divide-gray-200"
                            >
                              <li className="flex py-6 px-4 sm:px-6">
                                <div className="flex-shrink-0">
                                  <img
                                    src={singleSlot?.service?.image}
                                    alt=""
                                    className="w-20 rounded-md object-contain"
                                  />
                                </div>

                                <div className="ml-6 flex-1 flex flex-col">
                                  <div className="flex">
                                    <div className="min-w-0 flex-1">
                                      <h4 className="text-sm">
                                        <a
                                          href="#"
                                          className="text-gray-700 text-lg font-semibold"
                                        >
                                          {" "}
                                          {singleSlot?.service?.name}{" "}
                                        </a>
                                      </h4>
                                      <p className="text-sm text-gray-900">
                                        Date: {singleSlot?.date}
                                      </p>
                                      <p className="text-sm text-gray-900">
                                        Time:{" "}
                                        {`${singleSlot?.startTime}-${singleSlot?.endTime}`}
                                      </p>
                                      <p className="mt-1 text-sm font-medium text-gray-900">
                                        ${singleSlot?.service?.price}.00
                                      </p>
                                    </div>

                                    <div className="ml-4 flex-shrink-0 flow-root">
                                      <FaCircleXmark
                                        onClick={() =>
                                          handleRemoveFromCart(singleSlot?._id)
                                        }
                                        className="text-primary cursor-pointer text-lg"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        ))}
                      <div className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-sm">Subtotal</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            ${totalCost.toFixed(2)}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-sm">Convenience Fee</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            $5.00
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-sm">Taxes</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            $6.00
                          </dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                          <dt className="text-base font-medium">Total</dt>
                          <dd className="text-base font-medium text-gray-900">
                            ${total.toFixed(2)}
                          </dd>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <button
                        type="submit"
                        className="w-full bg-primary btn-custom border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500"
                      >
                        {isBookingLoading ? (
                          <ImSpinner6 className="animate-spin m-auto text-xl" />
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <h1 className="mt-16 text-3xl text-center lg:text-left font-bold">
                    No service has been booked yet.
                  </h1>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            >
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      defaultValue={loadedUser[0]?.email}
                      {...register("email", {
                        required: {
                          value: true,
                          message: "User Email is required",
                        },
                      })}
                      className="block w-full bg-transparent p-2 border border-gray-300 outline-none invalid:border-red-500 transition placeholder-slate-400 focus:ring-1 focus:border-red-500 rounded-lg focus:ring-primary"
                    />
                    <p className="text-sm text-red-600 font-medium  mt-2">
                      {errors?.email?.message as ReactNode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        defaultValue={loadedUser[0]?.name}
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Name is required",
                          },
                        })}
                        className="block w-full bg-transparent p-2 border border-gray-300 outline-none invalid:border-red-500 transition placeholder-slate-400 focus:ring-1 focus:border-red-500 rounded-lg focus:ring-primary"
                      />
                      <p className="text-sm text-red-600 font-medium  mt-2">
                        {errors?.name?.message as ReactNode}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        defaultValue={loadedUser[0]?.address}
                        {...register("address", {
                          required: {
                            value: true,
                            message: "Address is required",
                          },
                        })}
                        className="block w-full bg-transparent p-2 border border-gray-300 outline-none invalid:border-red-500 transition placeholder-slate-400 focus:ring-1 focus:border-red-500 rounded-lg focus:ring-primary"
                      />
                      <p className="text-sm text-red-600 font-medium  mt-2">
                        {errors?.address?.message as ReactNode}
                      </p>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        defaultValue={loadedUser[0]?.phone}
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "Phone Number is required",
                          },
                        })}
                        className="block w-full bg-transparent p-2 border border-gray-300 outline-none invalid:border-red-500 transition placeholder-slate-400 focus:ring-1 focus:border-red-500 rounded-lg focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BookingPage;
