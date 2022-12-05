import React from "react";
import { Outlet } from "react-router-dom";

const PatientRoutes = () => {
  const isAuthenticated = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"))

  const unAuthenticated = () => {
    alert("Please login to access the page")
    window.location.href = '/signin'
  }
  const permissionDenied= ()=>{
    alert("You are not permitted to access the page")
    window.location.href = '/signin'
  }
  return (
    <>
      {
        isAuthenticated ? user.role === "patient"? <Outlet />: permissionDenied() : unAuthenticated()
      }
    </>
  );
}

export default PatientRoutes;