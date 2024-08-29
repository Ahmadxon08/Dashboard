import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import "./Sidebar.scss";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import useMainStore from "../../store/useMainStore";

const logo = "./assets/img/logo.png";

const Sidebar = () => {
  const { t } = useTranslation();
  const [activeButton, setActiveButton] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
  const sidebarRef = useRef(null);
  const location = useLocation(); // bu yerda useLocation hookini olish kerak

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth >= 768);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isWideScreen) {
      handleOpenSidebar();
    } else {
      const storedActiveButton = localStorage.getItem("activeButton");
      if (storedActiveButton) {
        setActiveButton(storedActiveButton);
      }
    }
  }, [isWideScreen]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleButtonClick = (buttonName) => {
    window.scrollTo(0, 0);
    localStorage.setItem("activeButton", buttonName);
    setActiveButton(buttonName);
  };

  const categories = [
    { name: `${t("categories.allProducts")}`, path: "AllProducts" },
    { name: `${t("filter.goodsType")}`, path: "productsByType" },
    { name: "ProductsSearch 4", path: "/productsSearch" },
  ];

  const { handleCloseSidebar, handleOpenSidebar, openSidebar } = useMainStore(
    (state) => ({
      handleCloseSidebar: state.handleCloseSidebar,
      handleOpenSidebar: state.handleOpenSidebar,
      openSidebar: state.openSidebar,
    })
  );

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isWideScreen || openSidebar ? "open" : "closed"}`}>
      <div className="left">
        <Link to="/" className="logo">
          <Button variant="text">
            <img src={logo} alt="logo" />
            <span>Datasupermen</span>
          </Button>
        </Link>
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
                {t("sidebar.home")}
              </span>
            </Button>
          </Link>

          <Button
            sx={{ borderRadius: "0" }}
            onClick={() => {
              handleButtonClick("categories");
              toggleCategories();
            }}
            style={{
              border: 0,
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
                marginRight: "8px",
                color: activeButton === "categories" ? "#7000ff" : "#fff",
              }}>
              {t("sidebar.categories")}
            </span>
            {isCategoriesOpen ? (
              <MdKeyboardArrowDown
                size={22}
                style={{
                  color: activeButton === "categories" ? "#7000ff" : "#fff",
                }}
              />
            ) : (
              <MdKeyboardArrowRight
                size={22}
                style={{
                  color: activeButton === "categories" ? "#7000ff" : "#fff",
                }}
              />
            )}
          </Button>

          {isCategoriesOpen && (
            <div className="categoriesMenu">
              {categories.map((category) => (
                <Link
                  to={category.path}
                  key={category.name}
                  onClick={() => handleButtonClick(category.name)}>
                  <Button
                    sx={{
                      background:
                        activeButton === category.name
                          ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                          : "inherit",
                      color: "#fff",
                    }}>
                    <span
                      style={{
                        color:
                          activeButton === category.name ? "#7000ff" : "#fff",
                      }}>
                      {category.name}
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
          )}

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

          <Link to="/searchpro" onClick={() => handleButtonClick("searchpro")}>
            <Button
              style={{
                background:
                  activeButton === "searchpro"
                    ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                    : "inherit",
              }}>
              <GoHome
                size={24}
                style={{
                  color: activeButton === "searchpro" ? "#7000ff" : "#fff",
                }}
              />
              <span
                style={{
                  color: activeButton === "searchpro" ? "#7000ff" : "#fff",
                }}>
                {t("sidebar.searchpro")}
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="rigth" onClick={handleCloseSidebar}></div>
    </div>
  );
};

export default Sidebar;
