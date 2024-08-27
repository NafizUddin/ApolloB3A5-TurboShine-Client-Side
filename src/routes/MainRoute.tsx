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
        element: <ServiceDetails />,
      },
      {
        path: "reviews",
        element: <ReviewPage />,
      },
      {
        path: "bookings",
        element: <BookingPage />,
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
    element: <DashboardLayout />,
  },
]);

export default MainRoute;
