import React from "react";
import { Outlet } from "react-router-dom";

const DoctorRoutes = () => {
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))

  const unAuthenticated = () => {
    alert("Please login to access the page")
    localStorage.clear()
    window.location.href = '/signin'
  }
  const permissionDenied= ()=>{
    alert("You are not permitted to access the page")
    localStorage.clear()
    window.location.href = '/signin'
  }
  return (
    <>
      {
        isAuthenticated ? user.role === "doctor"? <Outlet />: permissionDenied() : unAuthenticated()
      }
    </>
  );
}

export default DoctorRoutes;