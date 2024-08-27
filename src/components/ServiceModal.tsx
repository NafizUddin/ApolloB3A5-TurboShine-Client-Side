/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldError, FieldValues, useForm } from "react-hook-form";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
} from "../redux/features/services/carService.api";
import { TCarService } from "../types/carService.type";
import toast from "react-hot-toast";

const ServiceModal = ({ service, setService, setModalType }: any) => {
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: service?.name,
      description: service?.description,
      price: Number(service?.price),
      duration: service?.brand,
      short_description: service?.category,
      image: service?.image,
    },
  });

  const onSubmit = async (data: any) => {
    const details = {
      name: data?.name,
      description: data?.description,
      price: Number(data?.price),
      image: data?.image,
      duration: data?.duration,
      short_description: data?.short_description,
    };

    Object.keys(service).length <= 0
      ? handleAddService(details)
      : handleUpdateService(details);
  };

  const handleAddService = async (details: Partial<TCarService>) => {
    await toast.promise(addService(details).unwrap(), {
      loading: "Creating new service...",
      success: (res) => {
        if (res.success) {
          return res.message;
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to create service",
    });
    setModalType("");
    setService({});
    reset();
  };

  const handleUpdateService = async (details: Partial<TCarService>) => {
    const options = {
      id: service?._id,
      data: details,
    };

    await toast.promise(updateService(options).unwrap(), {
      loading: "Updating new service...",
      success: (res) => {
        if (res.success) {
          return res.message;
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to create service",
    });

    setModalType("");
    setService({});
    reset();
  };

  return (
    <div>
      <input type="checkbox" id="product-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-4xl !important space-y-4">
          <h3 className="font-bold text-3xl text-center">{`${
            Object.keys(service).length <= 0 ? "Add New" : "Update Existing"
          } Service`}</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-x-5"
          >
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Service Name
                </span>
              </label>
              <input
                placeholder={service?.name || "Enter Service Name"}
                defaultValue={service?.name && service?.name}
                type="text"
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Service Name is required",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.name as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Service Cost
                </span>
              </label>
              <input
                type="number"
                min={0}
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder={service?.price || "Enter service cost"}
                defaultValue={service?.price && service?.price}
                {...register("price", {
                  required: {
                    value: true,
                    message: "Service Cost is required",
                  },
                })}
              />
              <label className="label">
                {errors.price?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.price as FieldError).message}
                  </span>
                )}
              </label>
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
                defaultValue={service?.description && service?.description}
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
                defaultValue={
                  service?.short_description && service?.short_description
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
                placeholder={
                  service?.duration ||
                  "Enter service duration (maximum 120 minutes)"
                }
                defaultValue={service?.duration && service?.duration}
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
                placeholder={service?.image || `Enter Service Image Link`}
                defaultValue={service?.image && service?.image}
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
              Submit Feedback
            </button>
            <label htmlFor="product-modal" className="col-span-6">
              <button
                onClick={() => {
                  setModalType("");
                  setService({});
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

export default ServiceModal;
