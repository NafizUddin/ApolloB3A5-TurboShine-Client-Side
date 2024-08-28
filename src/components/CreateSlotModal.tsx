import { TCarService } from "../types/carService.type";
import { useGetServicesQuery } from "../redux/features/services/carService.api";
import { FieldError, FieldValues, useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

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

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      date: data.date.toISOString().split("T")[0], // Convert date to YYYY-MM-DD format
    };
    console.log(formattedData);
  };

  const { data: allServices } = useGetServicesQuery({});

  const serviceInfo = allServices?.serviceData?.map((service: TCarService) => {
    return {
      serviceId: service._id,
      serviceName: service.name,
    };
  });

  const today = new Date();

  return (
    <div>
      <input type="checkbox" id="createSlot-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-4xl !important space-y-4">
          <h3 className="font-bold text-3xl text-center">Add New Slots</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-x-5"
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
              {/* {errors.service && <p>This field is required</p>} */}
              <label className="label">
                {errors.service?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.service as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Select Service Date
                </span>
              </label>
              <div>
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
                      className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary w-[410px]"
                    />
                  )}
                />
                {/* {errors.date && <p>This field is required</p>} */}
                <label className="label">
                  {errors.date?.type === "required" && (
                    <span className="label-text-alt text-red-600 text-sm">
                      {(errors.date as FieldError).message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Description
                </span>
              </label>
              <textarea
                placeholder={
                  "Enter brief description of service in few sentences..."
                }
                className="textarea textarea-bordered h-24 input focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary placeholder:text-base"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Service Brief Description is required",
                  },
                })}
              />
              <label className="label">
                {errors.description?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.description as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Short Description
                </span>
              </label>
              <textarea
                placeholder={
                  "Enter short description of service in few words (4 to 5 words)..."
                }
                className="textarea textarea-bordered h-24 input focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary placeholder:text-base"
                {...register("short_description", {
                  required: {
                    value: true,
                    message: "Service Short Description is required",
                  },
                })}
              />
              <label className="label">
                {errors.short_description?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.description as FieldError).message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Service Duration
                </span>
              </label>
              <input
                type="number"
                min={0}
                max={120}
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder={"Enter service duration (maximum 120 minutes)"}
                {...register("duration", {
                  required: {
                    value: true,
                    message: "Service Duration is required",
                  },
                })}
              />
              <label className="label">
                {errors.duration?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.duration as FieldError).message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Paste Service Image Link
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder={`Enter Service Image Link`}
                {...register("image", {
                  required: {
                    value: true,
                    message: "Service Image Link is required",
                  },
                })}
              />
              <label className="label">
                {errors.image?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.image as FieldError).message}
                  </span>
                )}
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white bg-primary rounded-lg btn-custom font-bold col-span-6"
            >
              Submit
            </button>
            <label htmlFor="createSlot-modal" className="col-span-6">
              <button
                onClick={() => {
                  setModalType("");
                }}
                className="bg-white outline outline-2 text-primary py-3 btn-custom-two rounded-lg font-bold w-full"
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
