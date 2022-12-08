import React from "react";
import Swal from "sweetalert2";
import { Outlet } from "react-router-dom";

const DoctorRoutes = () => {
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))

  const unAuthenticated = () => {
    Swal.fire({
      title: 'Unauthorized access!',
      text: 'You will be redirected to login page',
      icon: 'error'
    })
    setTimeout(() => {
      localStorage.clear()
      window.location.href = '/signin'
    }, 2000);
  }
  const permissionDenied = () => {
    Swal.fire(
      "You are not permitted to access the page",
      'failure'
    )
    localStorage.clear()
    window.location.href = '/signin'
  }
  return (
    <>
      {
        isAuthenticated ? user.role === "doctor" ? <Outlet /> : permissionDenied() : unAuthenticated()
      }
    </>
  );
}

export default DoctorRoutes;