import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayouts/MainLayout";
import Homepage from "../pages/homepage/Homepage";
import ErrorPage from "../pages/errorpage/ErrorPage";
import LoginPage from "../pages/loginPage/LoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";
import ReviewPage from "../pages/reviewPage/ReviewPage";
import ServicePage from "../pages/servicePage/ServicePage";
import ServiceDetails from "../pages/serviceDetails/ServiceDetails";
import BookingPage from "../pages/bookingPage/BookingPage";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/AdminPages/adminHome/AdminHome";
import ServiceManagement from "../pages/AdminPages/serviceManagement/ServiceManagement";
import SlotManagement from "../pages/AdminPages/slotManagement/SlotManagement";
import UserManagement from "../pages/AdminPages/userManagement/UserManagement";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "services",
        element: <ServicePage />,
      },
      {
        path: "serviceDetails/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: <ReviewPage />,
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <BookingPage />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "service-management",
        element: (
          <AdminRoute>
            <ServiceManagement />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "slot-management",
        element: (
          <AdminRoute>
            <SlotManagement />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default MainRoute;
