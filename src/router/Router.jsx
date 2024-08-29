import { useEffect } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "./Router.scss";
import { Outlet, useLocation } from "react-router-dom";

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    // Har safar sahifa o'zgarganda scrollni yuqoriga qaytarish
    window.scrollTo(0, 0);
  }, [location.pathname]); // location.pathname o'zgarishi bilan ishlaydi

  return (
    <>
      <Header />
      <div className="router">
        <div className="side">
          <Sidebar />
        </div>
        <div className="content1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Router;
