import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import "./Sidebar.scss";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { BsCollection } from "react-icons/bs";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import useMainStore from "../../store/useMainStore";
import { motion } from "framer-motion";
// import useData from "../../utils/data";
import useCategoryStore from "../../store/useCategoryStore";
import useManuStore from "../../store/useMenuStore";

const logo = "./assets/img/logo.png";

const Sidebar = () => {
  const [selectedParentId, setSelectedParentId] = useState(null);
  const { t } = useTranslation();
  const [activeButton, setActiveButton] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
  const sidebarRef = useRef(null);
  const location = useLocation();

  ////right side api data start
  const { setSelectedCategoryId, fetchProductsByCategoryId } = useCategoryStore(
    (state) => ({
      fetchProductsByCategoryId: state.fetchProductsByCategoryId,
      setSelectedCategoryId: state.setSelectedCategoryId,
    })
  );
  ////////

  const selectedCategoryId2 = null;

  const { parents, fetchParents, categoryChildren, fetchCategoryChildren } =
    useManuStore((state) => ({
      parents: state.parents,
      fetchParents: state.fetchParents,
      categoryChildren: state.categoryChildren,
      fetchCategoryChildren: state.fetchCategoryChildren,
    }));
  ///////////// this is for responsive views
  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth >= 768);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  /////active button action is startd here
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
  /////////////
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleButtonClick = (buttonName) => {
    window.scrollTo(0, 0);
    localStorage.setItem("activeButton", buttonName);
    setActiveButton(buttonName);
  };

  const { handleCloseSidebar, handleOpenSidebar, openSidebar } = useMainStore(
    (state) => ({
      handleCloseSidebar: state.handleCloseSidebar,
      handleOpenSidebar: state.handleOpenSidebar,
      openSidebar: state.openSidebar,
    })
  );

  useEffect(() => {
    if (openSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSidebar]);
  //////////////////////////////////
  useEffect(() => {
    fetchParents();
  }, [fetchParents]);

  useEffect(() => {
    if (selectedCategoryId2 !== null) {
      fetchCategoryChildren(selectedCategoryId2);
    }
  }, [selectedCategoryId2]);
  console.log("parent", parents);
  console.log("child", categoryChildren);

  const handleParentClick = (parentId) => {
    if (selectedParentId === parentId) {
      setSelectedParentId(null);
    } else {
      setSelectedParentId(parentId);
      setSelectedCategoryId(parentId);
      fetchCategoryChildren(parentId);
    }
  };
  const handleChildClick = (childId) => {
    setSelectedCategoryId(childId);
    fetchProductsByCategoryId(childId);
  };

  /////////////////////////////////////////////
  const toggleCategories = () => {
    setSelectedParentId(null);
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  console.log(selectedParentId);
  const handleCloseBar = () => {
    setSelectedParentId(null);
    handleCloseSidebar();
  };

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isWideScreen || openSidebar ? "open" : "closed"}`}>
      <div className="left">
        <div className="first">
          <Link to="/" className="logo">
            <Button variant="text">
              <img src={logo} alt="logo" width={30} height={30} />
              <span>Datasupermen</span>
            </Button>
          </Link>
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
                  position: "absolute",
                  right: "30px",
                  color: activeButton === "categories" ? "#7000ff" : "#fff",
                }}
              />
            ) : (
              <MdKeyboardArrowRight
                size={22}
                style={{
                  position: "absolute",
                  right: "30px",
                  color: activeButton === "categories" ? "#7000ff" : "#fff",
                }}
              />
            )}
          </Button>

          {isCategoriesOpen && (
            <div className="categoriesMenu">
              {parents
                .filter(
                  (p) => selectedParentId === null || p.id === selectedParentId
                )
                .map((p, index) => (
                  <motion.div
                    className="action"
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}>
                    <Link
                      to={`/products?section=${encodeURIComponent(
                        p.title.toLowerCase()
                      )}`}
                      onClick={() => handleButtonClick(p.title)}>
                      <Button
                        onClick={() => handleParentClick(p.id)}
                        style={{
                          display: p.id ? "flex" : "none",
                        }}
                        sx={{
                          background:
                            activeButton === p.title
                              ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                              : "inherit",
                          marginBottom: activeButton === p.title ? "6px" : "0",
                        }}>
                        {selectedParentId && (
                          <MdKeyboardDoubleArrowLeft
                            size={22}
                            style={{
                              position: "absolute",
                              left: "20px",
                              color:
                                activeButton === p.title ? "#7000ff" : "#fff",
                            }}
                          />
                        )}
                        <span
                          style={{
                            color:
                              activeButton === p.title ? "#7000ff" : "#fff",
                          }}>
                          {p.title}
                        </span>
                      </Button>
                    </Link>
                    {selectedParentId === p.id && (
                      <div className="children">
                        {categoryChildren.length > 0 &&
                          categoryChildren.map((child, index) => (
                            <motion.div
                              className="child"
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}>
                              <Link
                                to={`/products?section=${encodeURIComponent(
                                  p.title.toLowerCase()
                                )}?&part=${encodeURIComponent(
                                  child.title.toLowerCase()
                                )}`}
                                onClick={() => handleButtonClick(child.title)}>
                                <Button
                                  onClick={() => handleChildClick(child.id)}
                                  sx={{
                                    background:
                                      activeButton === child.title
                                        ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                                        : "inherit",
                                  }}>
                                  <span
                                    style={{
                                      color:
                                        activeButton === child.title
                                          ? "#7000ff"
                                          : "#fff",
                                    }}>
                                    {child.title}
                                  </span>
                                </Button>
                              </Link>
                            </motion.div>
                          ))}
                      </div>
                    )}
                  </motion.div>
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
        </div>
      </div>
      <div className="rigth" onClick={handleCloseBar}></div>
    </div>
  );
};

export default Sidebar;
