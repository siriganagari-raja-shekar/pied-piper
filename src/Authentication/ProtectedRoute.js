import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute=()=>{
  const isAuthenticated = localStorage.getItem("token");
  return (
    isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
  );
}

export default ProtectedRoute;