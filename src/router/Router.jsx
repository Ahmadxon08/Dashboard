import { useEffect } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "./Router.scss";
import { Outlet, useLocation } from "react-router-dom";
import useCategoryStore from "../store/useCategoryStore";

const Router = () => {
  const location = useLocation();
  const { loading } = useCategoryStore((state) => ({
    loading: state.loading,
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (loading) {
      document.querySelector(".app").style.overflow = "hidden";
    } else {
      document.querySelector(".app").style.overflow = "auto";
    }
  }, [loading]);

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
