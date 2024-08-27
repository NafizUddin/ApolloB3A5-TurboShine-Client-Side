import Loading from "../components/Loading";
import useUserDetails from "../custom Hooks/useUserDetails";
import { Navigate, useLocation } from "react-router";
import React from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { loadedUser, isLoading } = useUserDetails();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (loadedUser.length > 0) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
