import logo from "../../assets/logo.png";
import { ReactNode, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import toast from "react-hot-toast";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const RegisterPage = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [signUp] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleSignUp: SubmitHandler<FieldValues> = async (formData) => {
    setLoading(true);

    const imageFile = { image: formData?.image[0] };

    try {
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const userInfo = {
          ...formData,
          role: "user",
          image: res.data.data.display_url,
        };

        const registerResponse = await signUp(userInfo).unwrap();
        const user = verifyToken(registerResponse.token) as TUser;
        dispatch(setUser({ user: user, token: registerResponse.token }));
        toast.success("Signed Up successfully", { duration: 3000 });
        setLoading(false);
        reset();
        navigate(from);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:px-16 sm:py-12 md:w-[470px]">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center items-center">
                <Link to="/">
                  <img src={logo} className="w-52" />
                </Link>
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
              </div>

              <form
                onSubmit={handleSubmit(handleSignUp)}
                className="mt-10 space-y-8 text-white"
                noValidate
              >
                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="text"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "User Name is required",
                      },
                    })}
                    className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition text-gray-800"
                    placeholder="Enter your name"
                  />
                  <p className="mt-2 text-sm text-primary font-medium">
                    {errors?.name?.message as ReactNode}
                  </p>
                </div>

                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="email"
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
                    className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition text-gray-800"
                    placeholder="Enter your email"
                  />
                  <p className="mt-2 text-sm text-primary font-medium">
                    {errors?.userEmail?.message as ReactNode}
                  </p>
                </div>

                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="number"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "User Phone Number is required",
                      },
                    })}
                    className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition text-gray-800"
                    placeholder="Enter your phone number"
                  />
                  <p className="mt-2 text-sm text-primary font-medium">
                    {errors?.phone?.message as ReactNode}
                  </p>
                </div>

                <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <input
                    type="text"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "User Address is required",
                      },
                    })}
                    className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none invalid:border-red-400 transition text-gray-800"
                    placeholder="Enter your address"
                  />
                  <p className="mt-2 text-sm text-primary font-medium">
                    {errors?.address?.message as ReactNode}
                  </p>
                </div>

                <div>
                  <div className="flex flex-col items-end">
                    <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-primary focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Password is required",
                          },
                        })}
                        id=""
                        className="w-full bg-transparent pb-3  border-b border-gray-300 outline-none transition text-gray-800"
                        placeholder="Enter your password"
                        required
                      />
                      <span
                        className="absolute right-3 top-2 text-gray-800"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <FaEyeSlash></FaEyeSlash>
                        ) : (
                          <FaEye></FaEye>
                        )}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-primary font-medium">
                      {errors?.password?.message as ReactNode}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="block md:text-xl text-gray-700 -mt-2"
                    >
                      Upload Avatar
                    </label>

                    <input
                      id="example1"
                      type="file"
                      accept="image/*"
                      {...register("image", {
                        required: {
                          value: true,
                          message: "User Photo is required",
                        },
                      })}
                      className="mt-2 block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:border hover:file:border-red-500 hover:file:bg-[white] hover:file:text-primary disabled:pointer-events-none disabled:opacity-60"
                    />
                  </div>
                  <p className="text-sm text-red-600 font-medium ml-28 md:ml-44 mt-2">
                    {errors?.image?.message as ReactNode}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full h-11 flex items-center justify-center text-white bg-primary btn-custom font-bold"
                >
                  {loading ? (
                    <ImSpinner6 className="animate-spin m-auto text-xl" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
              <div className="w-full rounded-lg md:mt-6 xl:p-0">
                <h1 className="text-center">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="hover:underline hover:text-primary font-medium">
                      Login Here
                    </span>
                  </Link>
                </h1>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
