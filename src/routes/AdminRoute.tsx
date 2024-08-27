import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import useUserDetails from "../custom Hooks/useUserDetails";
import Loading from "../components/Loading";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { loadedUser, isLoading } = useUserDetails();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (loadedUser.length > 0 && loadedUser[0].role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
