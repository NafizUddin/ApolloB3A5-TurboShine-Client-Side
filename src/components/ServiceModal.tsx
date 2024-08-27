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
        <div className="modal-box bg-secondary max-w-4xl !important space-y-4">
          <h3 className="font-bold text-lg text-white text-left">{`${
            Object.keys(service).length <= 0 ? "Add" : "Edit"
          } Service`}</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-x-5"
          >
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text text-[#E2E2E2] font-semibold">
                  Name *
                </span>
              </label>
              <input
                placeholder={service?.name || "Enter Service Name"}
                defaultValue={service?.name && service?.name}
                type="text"
                className="input input-bordered bg-[#2E2D2D] text-white border-0 rounded-none focus:outline-none"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
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
                <span className="label-text text-[#E2E2E2] font-semibold">
                  Service Cost *
                </span>
              </label>
              <input
                type="number"
                min={0}
                className="input input-bordered bg-[#2E2D2D] text-white border-0 rounded-none"
                placeholder={service?.price || "Enter service cost"}
                defaultValue={service?.price && service?.price}
                {...register("price", {
                  required: {
                    value: true,
                    message: "Price is required",
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
            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text text-white font-semibold">
                  Description *
                </span>
              </label>
              <textarea
                placeholder={
                  "Enter brief description of service in few sentences..."
                }
                defaultValue={service?.description && service?.description}
                className="textarea textarea-bordered bg-[#2E2D2D] text-white border-0 rounded-none  h-24"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
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

            {/* <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text text-[#E2E2E2] font-semibold">
                  Brand *
                </span>
              </label>
              <input
                placeholder={product?.brand || `Product Brand`}
                defaultValue={product?.brand && product?.brand}
                type="text"
                className="input input-bordered bg-[#2E2D2D] text-white border-0 rounded-none focus:outline-none"
                {...register("brand", {
                  required: {
                    value: true,
                    message: "Brand is required",
                  },
                })}
              />
              <label className="label">
                {errors.brand?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.brand as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text text-[#E2E2E2] font-semibold">
                  Stock Quantity *
                </span>
              </label>
              <input
                type="number"
                min={0}
                className="input input-bordered bg-[#2E2D2D] text-white border-0 rounded-none"
                defaultValue={product?.stockQuantity && product?.stockQuantity}
                {...register("stockQuantity", {
                  required: {
                    value: true,
                    message: "Stock Quanitity is required",
                  },
                })}
              />
              <label className="label">
                {errors.stockQuantity?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.stockQuantity as FieldError).message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text text-[#E2E2E2] font-semibold">
                  Image Link *
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-[#2E2D2D] text-white border-0 rounded-none focus:outline-none"
                placeholder={product?.image || `Image Link`}
                defaultValue={product?.image && product?.image}
                {...register("image", {
                  required: {
                    value: true,
                    message: "Image Link is required",
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
            </div> */}

            <input
              type="submit"
              value="Submit"
              className="btn btn-md btn-accent w-full font-bold col-span-6"
            />
            <label
              onClick={() => {
                setModalType("");
                setService({});
              }}
              htmlFor="product-modal"
              className="btn btn-md w-full font-bold col-span-6"
            >
              Cancel
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
