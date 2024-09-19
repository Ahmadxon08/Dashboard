import { useEffect } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "./Router.scss";
import { Outlet, useLocation } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import useCategoryStore from "../store/useCategoryStore";
// import Backtop from "../components/backtop/Backtop";

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
    }
  }, [loading]);
  return (
    <>
      <div className="loader">
        {loading && (
          <LinearProgress
            // variant="determinate"
            value={loading}
            sx={{
              backgroundColor: "#fff", // Progress bar orqa fon rangi
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#7000ff", // Progress bar to'liq rangi
              },
            }}
          />
        )}
      </div>
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
