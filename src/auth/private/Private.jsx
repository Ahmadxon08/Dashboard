/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const Private = ({ isLogened }) => {
  if (!isLogened) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

// PropTypes qo'shish
Private.propTypes = {
  isLogened: PropTypes.bool.isRequired,
};

export default Private;
