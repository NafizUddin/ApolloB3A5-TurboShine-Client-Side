import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Loading from "../../components/Loading";
import { useGetSingleServiceQuery } from "../../redux/features/services/carService.api";
import { useParams } from "react-router-dom";
import { LuClock } from "react-icons/lu";
import { FaCheckToSlot } from "react-icons/fa6";
import { useMemo } from "react";
import { useGetSlotsQuery } from "../../redux/features/slots/slots.api";
import { TSlotAppointment } from "@/types/slot.type";

const ServiceDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleServiceQuery(id);

  const serviceId = data?._id;
  const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format

  const queryObj = useMemo(
    () => ({
      currentDate,
      serviceId,
    }),
    [currentDate, serviceId]
  );

  const { data: currentDateSlots } = useGetSlotsQuery(queryObj);

  console.log(currentDateSlots);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Food Details */}
      <div className="mt-8 mx-6 xl:mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 my-10">
          <div className="lg:col-span-4 mt-5">
            <img
              src={data?.image}
              className="max-h-[380px] object-cover w-full"
            />
          </div>
          <div className="lg:col-span-2 lg:ml-6 text-center lg:text-left">
            <h1 className="text-3xl font-bold mt-5 mb-2">{data?.name}</h1>
            <p className="mt-2 text-lg text-gray-500">{data?.description}</p>
            <p className="text-xl font-medium mt-3 flex items-center gap-1">
              <RiMoneyDollarCircleLine className="mb-2" />
              <span className="">Service Cost: ${data?.price}.00</span>
            </p>
            <p className="text-xl font-medium mt-3 flex items-center gap-1">
              <LuClock className="mb-2" />
              <span className="">
                Service Duration: {data?.duration} minutes
              </span>
            </p>

            {/* <p className="text-xl mt-2 font-medium">
              Category: <span className="">{singleProduct?.category}</span>
            </p>
            <p className="text-xl mt-2 font-medium">
              Stock Quantity: <span className="">{inStock}</span>
            </p>

            <div className="flex flex-col items-center lg:items-start mt-2">
              {inStock ? (
                <div className="flex gap-2 xl:gap-4 items-center lg:items-start xl:items-center">
                  <div className="text-xl xl:text-2xl text-green-600 mt-1 xl:mt-0">
                    <AiFillCheckCircle></AiFillCheckCircle>
                  </div>
                  <p className="text-lg xl:text-xl text-green-600">In Stock</p>
                </div>
              ) : (
                <div className="flex gap-4 items-center lg:items-start xl:items-center">
                  <div className="text-xl xl:text-2xl text-red-600 lg:mt-1 xl:mt-0">
                    <FaCircleXmark />
                  </div>
                  <p className="text-lg xl:text-xl text-red-600">
                    Out of Stock
                  </p>
                </div>
              )}
              <div className="flex gap-2 xl:gap-4 items-center lg:items-start xl:items-center mt-3">
                <div className="text-xl xl:text-2xl text-green-600 lg:mt-1 xl:mt-0">
                  <AiFillCheckCircle></AiFillCheckCircle>
                </div>
                <p className="text-lg xl:text-xl text-green-600">
                  Free Delivery Available
                </p>
              </div>
            </div>
            <div className="mt-5 w-[280px] mx-auto lg:w-full lg:mx-auto">
              <QuantitySelector
                quantity={quantity}
                increment={increment}
                decrement={decrement}
                inStock={inStock}
              />
            </div>
            <div className="flex items-center justify-center lg:justify-start mt-5 md:w-[280px] md:mx-auto lg:w-full lg:mx-auto">
              {isDisabled ? (
                <button className="flex items-center gap-2 px-6 py-3  rounded-lg w-full justify-center btn btn-disabled">
                  <BsCart3></BsCart3> <span>Add to cart</span>
                </button>
              ) : (
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button w-[280px] mx-auto lg:w-full lg:mx-auto"
                >
                  <span
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 px-6 py-3  rounded-lg w-full justify-center bg-[#e08534] btn-custom text-white cursor-pointer"
                  >
                    <BsCart3></BsCart3> <span>Add to cart</span>
                  </span>
                </label>
              )}
            </div> */}
          </div>
        </div>

        <div>
          <div className="text-xl font-medium mt-2 flex items-center justify-center">
            <div className="flex items-center gap-1 text-3xl">
              <FaCheckToSlot className="mb-2" />
              <span className="">Today's Available Slots:</span>
            </div>
          </div>
          <div className="flex items-center justify-center flex-wrap mt-4 w-4/5 mx-auto gap-1">
            {currentDateSlots?.map((singleSlot: TSlotAppointment) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
