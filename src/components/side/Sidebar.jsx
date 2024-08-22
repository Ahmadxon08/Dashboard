import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./Side.scss";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const Sidebar = () => {
  const { t } = useTranslation();
  const [activeButton, setActiveButton] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    const storedActiveButton = localStorage.getItem("activeButton");
    if (storedActiveButton) {
      setActiveButton(storedActiveButton);
    }
  }, []);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleButtonClick = (buttonName) => {
    localStorage.setItem("activeButton", buttonName);

    setActiveButton(buttonName);
  };
  const categories = [
    { name: `${t("categories.allProducts")}`, path: "AllProducts" },
    { name: "Category 1", path: "searchProductsPage" },

    { name: "Category 3", path: "findpro" },
    { name: "Category 4", path: "/category4" },
    { name: "Category 5", path: "/category5" },
  ];

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
              {t("sidebar.home")}
            </span>
          </Button>
        </Link>

        <Button
          sx={{
            borderRadius: "0",
          }}
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
            <FiUsers
              size={22}
              style={{
                color: activeButton === "searchpro" ? "#7000ff" : "#fff",
              }}
            />
            <span
              style={{
                color: activeButton === "searchpro" ? "#7000ff" : "#fff",
              }}>
              searchpro
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
