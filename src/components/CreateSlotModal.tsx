import { TCarService } from "../types/carService.type";
import { useGetServicesQuery } from "../redux/features/services/carService.api";
import { FieldValues, useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useAddNewSlotsMutation } from "../redux/features/slots/slots.api";
import { format, startOfDay } from "date-fns";

const CreateSlotModal = ({ setModalType }: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      service: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const { data: allServices } = useGetServicesQuery({});
  const [addNewSlots] = useAddNewSlotsMutation();

  const serviceInfo = allServices?.serviceData?.map((service: TCarService) => {
    return {
      serviceId: service._id,
      serviceName: service.name,
    };
  });

  const today = new Date();
  // Helper function to format dates to YYYY-MM-DD
  const formatDate = (date: Date) => format(startOfDay(date), "yyyy-MM-dd");

  const onSubmit = async (data: any) => {
    const formattedDate = formatDate(data.date);

    const formattedData = {
      ...data,
      date: formattedDate, // Converting date to YYYY-MM-DD format
    };

    await toast.promise(addNewSlots(formattedData).unwrap(), {
      loading: "Creating new slots...",
      success: (res) => {
        if (res.success) {
          return res.message;
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to create new slots",
    });

    // console.log(formattedData);

    // try {
    //   const res = await addNewSlots(formattedData).unwrap();
    // } catch (error) {
    //   console.log(error);
    // }

    setModalType("");
    reset();
  };

  return (
    <div>
      <input type="checkbox" id="createSlot-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-4xl !important space-y-4">
          <h3 className="font-bold text-3xl text-center">Add New Slots</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-x-5 gap-y-14"
          >
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Select Car Service
                </span>
              </label>
              <select
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                id="service"
                {...register("service", { required: true })}
              >
                <option value="">Select a service</option>
                {serviceInfo?.map((service: any) => (
                  <option key={service.serviceId} value={service.serviceId}>
                    {service.serviceName}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  Please Select a service
                </p>
              )}
            </div>

            <div className="form-control w-full col-span-12 sm:col-span-6 z-50">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Select Service Date
                </span>
              </label>
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    id="date"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={today}
                    placeholderText="Select Service Date"
                    className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary w-full"
                    onKeyDown={(e) => e.preventDefault()}
                  />
                )}
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  Please Select Service Date
                </p>
              )}
            </div>

            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Select Start Time
                </span>
              </label>
              <input
                type="time"
                id="startTime"
                {...register("startTime", { required: true })}
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder="Select Start Time"
              />
              {errors.startTime && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  Please Select Start Time
                </p>
              )}
            </div>

            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Select End time
                </span>
              </label>
              <input
                type="time"
                id="endTime"
                {...register("endTime", { required: true })}
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder="Select End Time"
              />
              {errors.endTime && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  Please Select End Time
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-primary rounded-lg btn-custom font-bold col-span-6 mt-5"
            >
              Submit
            </button>
            <label htmlFor="createSlot-modal" className="col-span-6">
              <button
                onClick={() => {
                  setModalType("");
                }}
                className="bg-white outline outline-2 text-primary py-3 btn-custom-two rounded-lg font-bold w-full mt-5"
              >
                Cancel
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSlotModal;
