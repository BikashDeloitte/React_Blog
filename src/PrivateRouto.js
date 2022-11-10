import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "./auth/UserDataAuth";

//private route is use for seperating login and logout display
const PrivateRoute = () => {
  // Outlet is a place where inner route component display
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
