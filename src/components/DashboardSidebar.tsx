import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/removed-bg-logo.png";
import { MdOutlineLogout } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { GrServices, GrTasks } from "react-icons/gr";
import { MdOutlineTask } from "react-icons/md";
import { CgHome, CgProfile } from "react-icons/cg";
import useUserDetails from "../custom Hooks/useUserDetails";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import Loading from "./Loading";

const DashboardSidebar = () => {
  const { loadedUser, isLoading } = useUserDetails();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 3000 });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        id="view"
        className="h-full flex flex-row drawer lg:drawer-open z-50"
        // eslint-disable-next-line react/no-unknown-property
        x-data="{ sidenav: true }"
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>
        <div
          id="sidebar"
          className="drawer-side h-full max-h-screen overflow-y-scroll"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
            height: "100vh" /* Ensure full viewport height */,
            overflowY: "auto" /* Enable scrolling */,
          }}
          // eslint-disable-next-line react/no-unknown-property
          x-show="sidenav"
        >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-52 md:w-80 min-h-full bg-base-200 text-base-content">
            <div className="space-y-6 md:space-y-10">
              <Link to="/">
                <img src={logo} className="w-52 mx-auto" />
              </Link>

              <div id="profile" className="space-y-3">
                <img
                  src={loadedUser[0].image}
                  alt="Avatar user"
                  className="w-10 h-10 md:w-20 md:h-20 rounded-full mx-auto object-cover object-top"
                />
                <div>
                  <h2 className="font-medium md:text-xl text-center text-primary">
                    {loadedUser[0].name}
                  </h2>
                </div>
              </div>
              <div
                id="menu"
                className="flex flex-col justify-between space-y-2"
              >
                <div className="space-y-2">
                  {loadedUser[0].role === "admin" ? (
                    <>
                      <li>
                        <Link
                          to="/dashboard/adminHome"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <FaTasks className="text-xl mr-1" />
                          <span className="">Admin Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/service-management"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                        >
                          <BsListTask className="text-xl mr-1" />
                          Service Management
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/slot-management"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                        >
                          <GrTasks className="text-xl mr-1" />
                          Slot Management
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/user-management"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                        >
                          <MdOutlineTask className="text-xl mr-1" />
                          User Management
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/dashboard/userHome"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <FaTasks className="text-xl mr-1" />
                          <span className="">User Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/past-bookings"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                        >
                          <BsListTask className="text-xl mr-1" />
                          Past Bookings
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/upcoming-bookings"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                        >
                          <GrTasks className="text-xl mr-1" />
                          Upcoming Bookings
                        </Link>
                      </li>
                    </>
                  )}
                  <div className="divider"></div>
                  <li>
                    <Link
                      to="/"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                    >
                      <CgHome className="text-xl mr-1" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                    >
                      <GrServices className="text-xl mr-1" />
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                    >
                      <GrServices className="text-xl mr-1" />
                      Services
                    </Link>
                  </li>
                </div>
                <div>
                  <div className="divider"></div>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-[#0f6097] hover:text-white hover:scale-105"
                    >
                      <CgProfile className="text-xl mr-1" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleLogOut}
                      className="text-sm font-medium hover:bg-[#0f6097] hover:text-white hover:scale-105"
                    >
                      <MdOutlineLogout className="text-lg mr-1" /> Logout
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
