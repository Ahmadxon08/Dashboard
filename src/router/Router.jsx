import { useEffect } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "./Router.scss";
import { Outlet, useLocation } from "react-router-dom";
// import Backtop from "../components/backtop/Backtop";

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="router">
        <div className="side">
          <Sidebar />
        </div>
        <div className="content1">
          <Outlet />
          {/* <Backtop /> */}
        </div>
      </div>
    </>
  );
};

export default Router;
