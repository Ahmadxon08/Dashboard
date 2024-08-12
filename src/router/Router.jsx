/* eslint-disable react/prop-types */
import Sidebar from "../components/side/Sidebar";
import Header from "../components/header/Header";
import "./Router.scss";
import { Outlet } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Header />
      <div className="router">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Router;
