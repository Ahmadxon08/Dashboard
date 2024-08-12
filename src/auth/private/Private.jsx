/* eslint-disable react/prop-types */
// Private.js
import { Navigate, Outlet } from "react-router-dom";

const Private = ({ isLogened }) => {
  return isLogened ? <Outlet /> : <Navigate to="/login" />;
};

export default Private;
