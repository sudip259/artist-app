import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const PrivateRoute: React.FC<any> = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
