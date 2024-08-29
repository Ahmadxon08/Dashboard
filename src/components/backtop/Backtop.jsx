import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import "./Backtop.scss";

const Backtop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    show && (
      <div className="backtop">
        <Button onClick={scrollToTop} className="backtop-button">
          <ArrowUpward />
        </Button>
      </div>
    )
  );
};

export default Backtop;
