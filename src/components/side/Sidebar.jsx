import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./Side.scss";
import { GoHome } from "react-icons/go";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { FiUsers } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";

const Sidebar = () => {
  const { t } = useTranslation();
  const [activeButton, setActiveButton] = useState("");
  /// to keep active button with default active state
  useEffect(() => {
    const storedActiveButton = localStorage.getItem("activeButton");
    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
    }
  }, []);

  const handleButtonClick = (buttonName) => {
    localStorage.setItem("activeButton", buttonName);
    setActiveButton(buttonName);
  };
  //////////////////////////////////////
  return (
    <div className="left">
      <div className="first">
        <Link to="/" onClick={() => handleButtonClick("home")}>
          <Button
            style={{
              background:
                activeButton === "home"
                  ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                  : "inherit",
            }}>
            <GoHome
              size={24}
              style={{
                color: activeButton === "home" ? "#7000ff" : "#fff",
              }}
            />
            <span
              style={{
                color: activeButton === "home" ? "#7000ff" : "#fff",
              }}>
              {t("sidebar.home")}{" "}
            </span>
          </Button>
        </Link>
        <Link to="/categories" onClick={() => handleButtonClick("categories")}>
          <Button
            style={{
              background:
                activeButton === "categories"
                  ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                  : "inherit",
            }}>
            <BsCollection
              size={22}
              style={{
                color: activeButton === "categories" ? "#7000ff" : "#fff",
              }}
            />
            <span
              style={{
                color: activeButton === "categories" ? "#7000ff" : "#fff",
              }}>
              {t("sidebar.categories")}
            </span>
          </Button>
        </Link>
        <Link to="/users" onClick={() => handleButtonClick("users")}>
          <Button
            style={{
              background:
                activeButton === "users"
                  ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                  : "inherit",
            }}>
            <FiUsers
              size={22}
              style={{
                color: activeButton === "users" ? "#7000ff" : "#fff",
              }}
            />
            <span
              style={{
                color: activeButton === "users" ? "#7000ff" : "#fff",
              }}>
              {t("sidebar.users")}
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
