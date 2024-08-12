// src/pages/NotFoundPage.js

import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import "./NotFound.scss";
const video = "./assets/video/404Found.mp4"; // Video manzilingiz

const NotFound = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="notFound">
      <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
      </video>

      <div
        className="body404"
        style={{
          marginTop: "120px",
        }}>
        <Typography variant="h3">404 - Page Not Found</Typography>
        <p>The page you are looking for does not exist!</p>
        <Button variant="contained" color="primary" onClick={handleNavigation}>
          {user
            ? "You look lost! Let's go back to the main page"
            : "You have not logged in yet, let's create an account"}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
