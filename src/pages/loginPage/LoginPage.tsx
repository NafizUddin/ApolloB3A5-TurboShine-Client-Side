import logo from "../../assets/logo.png";
import { ReactNode, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { ImSpinner6 } from "react-icons/im";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";

const LoginPage = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleSignIn: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.token) as TUser;
      dispatch(setUser({ user: user, token: res.token }));
      toast.success("Logged in successfully", { duration: 3000 });
      setLoading(false);
      reset();
      navigate(from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:px-16 sm:py-12">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center items-center">
                <Link to="/">
                  <img src={logo} className="w-52" />
                </Link>
              </div>
              <div className="mt-10">
                <h1 className="text-2xl font-semibold text-center">Sign In</h1>
              </div>

              <form
                onSubmit={handleSubmit(handleSignIn)}
                className="mt-10 space-y-8 text-white"
                noValidate
              >
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

                <button
                  type="submit"
                  className="w-full rounded-full h-11 flex items-center justify-center text-white bg-primary btn-custom font-bold"
                >
                  {loading ? (
                    <ImSpinner6 className="animate-spin m-auto text-xl" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
              <div className="w-full rounded-lg md:mt-6 xl:p-0">
                <h1 className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">
                    <span className="hover:underline hover:text-primary font-medium">
                      Create free account
                    </span>
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
