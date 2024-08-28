import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../redux/features/auth/authApi";
import { FieldError, FieldValues, useForm } from "react-hook-form";

const UpdateProfileModal = ({ setModalType, userData }: any) => {
  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
      phone: userData?.phone,
      address: userData?.address,
      image: userData?.image,
    },
  });

  const onSubmit = async (data: any) => {
    const options = {
      id: userData._id,
      data: {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        image: data?.image,
      },
    };

    await toast.promise(updateUser(options).unwrap(), {
      loading: "Updating profile...",
      success: (res) => {
        if (res.success) {
          return res.message;
        } else {
          throw new Error(res.message);
        }
      },
      error: "Failed to update status",
    });

    setModalType("");
    reset();
  };

  return (
    <div>
      <input
        type="checkbox"
        id="updateProfile-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box max-w-4xl !important space-y-4">
          <h3 className="font-bold text-3xl text-center">Update Profile</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-x-5"
          >
            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">Name</span>
              </label>
              <input
                placeholder={"Enter User Name"}
                defaultValue={userData?.name && userData?.name}
                type="text"
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                {...register("name", {
                  required: {
                    value: true,
                    message: "User Name is required",
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
                <span className="label-text font-semibold text-lg">Email</span>
              </label>
              <input
                type="text"
                min={0}
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder={"Enter user email"}
                defaultValue={userData?.email && userData?.email}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid Email Format",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.email as FieldError).message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full col-span-12">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Address
                </span>
              </label>
              <textarea
                placeholder={"Enter address..."}
                defaultValue={userData?.address && userData?.address}
                className="textarea textarea-bordered h-24 input focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary placeholder:text-base text-base"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Address is required",
                  },
                })}
              />
              <label className="label">
                {errors.address?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.address as FieldError).message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full col-span-12 sm:col-span-6">
              {" "}
              <label className="label">
                <span className="label-text font-semibold text-lg">Phone</span>
              </label>
              <input
                type="number"
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder={"Enter Phone Number"}
                defaultValue={userData?.phone && userData?.phone}
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone Number is required",
                  },
                })}
              />
              <label className="label">
                {errors.phone?.type === "required" && (
                  <span className="label-text-alt text-red-600 text-sm">
                    {(errors.phone as FieldError).message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full col-span-12 sm:col-span-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  {" "}
                  Paste Image Link
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered focus:outline-none rounded-md border border-gray-300 outline-none invalid:border-primary transition placeholder-slate-400 focus:ring-1 focus:border-primary focus:ring-primary"
                placeholder={"Enter User Image Link"}
                defaultValue={userData?.image && userData?.image}
                {...register("image", {
                  required: {
                    value: true,
                    message: "User Image Link is required",
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
            <label htmlFor="updateProfile-modal" className="col-span-6">
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

export default UpdateProfileModal;
