/* eslint-disable react/prop-types */
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "./Router.scss";
import { Outlet } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Header />
      <div className="router">
        <Sidebar />
        <div className="content1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Router;
