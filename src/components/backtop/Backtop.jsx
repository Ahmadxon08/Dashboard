import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import "./Backtop.scss";

const Backtop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.stopPropagation(); // Tashqi elementlarga hodisani yuborishni to'xtatadi
    e.preventDefault(); // Brauzerning default hodisasini to'xtatadi (masalan, form submit)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    show && (
      <div className="backtop">
        <Button
          onClick={scrollToTop}
          className="backtop-button"
          aria-label="Scroll to top">
          <ArrowUpward />
        </Button>
      </div>
    )
  );
};

export default Backtop;
