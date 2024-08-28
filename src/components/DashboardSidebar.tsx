import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/removed-bg-logo.png";
import { MdOutlineBookmarkAdded, MdOutlineLogout } from "react-icons/md";
import { GrServices, GrTasks } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import useUserDetails from "../custom Hooks/useUserDetails";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import Loading from "./Loading";
import { IoHome } from "react-icons/io5";
import { MdOutlineBorderColor } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaChevronDown, FaUsers, FaUsersCog } from "react-icons/fa";
import { useState } from "react";

const DashboardSidebar = () => {
  const { loadedUser, isLoading } = useUserDetails();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully", { duration: 3000 });
    navigate("/");
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
            <div className="space-y-6">
              <div className="mb-5">
                <Link to="/">
                  <img src={logo} className="w-52 mx-auto" />
                </Link>
              </div>

              <div id="profile" className="space-y-3">
                <img
                  src={loadedUser[0].image}
                  alt="Avatar user"
                  className="w-10 h-10 md:w-20 md:h-20 rounded-full mx-auto object-cover object-top"
                />
                <div>
                  <h2 className="font-bold md:text-xl text-center text-primary">
                    {loadedUser[0].name}
                  </h2>
                </div>
              </div>
              <div id="menu" className="flex flex-col">
                <div className="space-y-2">
                  {loadedUser[0].role === "admin" ? (
                    <>
                      <li>
                        <Link
                          to="/dashboard/adminHome"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <IoHome className="text-xl mr-1" />
                          <span className="mt-2">Admin Home</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/service-management"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <MdMiscellaneousServices className="text-xl mr-1" />
                          <span className="mt-1">Service Management</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/slot-management"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <GrTasks className="text-xl mr-1" />
                          <span className="mt-1">Slot Management</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          // to="/dashboard/user-management"
                          onClick={toggleDropdown}
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <FaUsersCog className="text-xl mr-1" />
                          <span className="mt-1">User Management</span>
                          <FaChevronDown
                            className={`text-sm ml-24  transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </li>
                      {isOpen && (
                        <li>
                          <Link
                            to="/dashboard/user-management/all-users"
                            className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                          >
                            <FaUsers className="text-xl mr-1" />
                            <span className="mt-1">All Users</span>
                          </Link>
                        </li>
                      )}
                      {isOpen && (
                        <li>
                          <Link
                            to="/dashboard/user-management/all-bookings"
                            className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                          >
                            <MdOutlineBookmarkAdded className="text-xl mr-1" />
                            <span className="mt-1">All Bookings</span>
                          </Link>
                        </li>
                      )}
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/dashboard/userHome"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <IoHome className="text-xl mr-1" />
                          <span className="mt-2">All Bookings</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/past-bookings"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <MdOutlineBorderColor className="text-xl mr-1" />
                          <span className="mt-1">Past Bookings</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/upcoming-bookings"
                          className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                        >
                          <GrTasks className="text-xl mr-1" />
                          <span className="mt-1">Upcoming Bookings</span>
                        </Link>
                      </li>
                    </>
                  )}
                  <div className="divider"></div>
                  <li>
                    <Link
                      to="/"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                    >
                      <IoHome className="text-xl mr-1" />
                      <span className="mt-2">Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                    >
                      <GrServices className="text-xl mr-1" />
                      <span className="mt-1">Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/reviews"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                    >
                      <MdOutlineRateReview className="text-xl mr-1" />
                      <span className="mt-1">Reviews</span>
                    </Link>
                  </li>
                  {loadedUser[0].role !== "admin" && (
                    <li>
                      <Link
                        to="/bookings"
                        className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                      >
                        <BsCardChecklist className="text-xl mr-1" />
                        <span className="mt-1">Bookings</span>
                      </Link>
                    </li>
                  )}
                </div>
                <div>
                  <div className="divider"></div>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className="text-sm font-medium flex gap-2 py-2 px-2 rounded-md transition duration-150 ease-in-out hover:bg-primary hover:text-white hover:scale-105"
                    >
                      <CgProfile className="text-xl mr-1" />
                      <span className="mt-1">Profile</span>
                    </Link>
                  </li>
                  <li className="xl:-ml-2">
                    <a
                      onClick={handleLogOut}
                      className="text-sm font-medium hover:bg-primary hover:text-white hover:scale-105"
                    >
                      <MdOutlineLogout className="text-lg mr-1" />{" "}
                      <span className="mt-1">Logout</span>
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
