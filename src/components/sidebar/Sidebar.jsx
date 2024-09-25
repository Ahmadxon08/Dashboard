import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import "./Sidebar.scss";
import { GoHome } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { BsCollection } from "react-icons/bs";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import useMainStore from "../../store/useMainStore";
import { motion } from "framer-motion";
import useCategoryStore from "../../store/useCategoryStore";
import useManuStore from "../../store/useMenuStore";
import useMenuStore from "../../store/useMenuStore";

const logo = "./assets/img/logo.png";

const Sidebar = () => {
  const { t } = useTranslation();
  // const [activeButton, setActiveButton] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 768);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const { setActiveButton, activeButton, setCategoryTitle } = useMenuStore(
    (state) => ({
      setActiveButton: state.setActiveButton,
      activeButton: state.activeButton,
      setCategoryTitle: state.setCategoryTitle,
    })
  );
  ////right side api data start
  const {
    setSelectedCategoryId,
    isCategoriesOpen,
    setIsCategoriesOpen,
    uniqueItems,
    selectedParentId,
    selectedGrandParentId,
    setSelectedGrandParentId,
    setSelectedParentId,
    fetchProductsByCategoryId,
  } = useCategoryStore((state) => ({
    selectedGrandParentId: state.selectedGrandParentId,
    selectedParentId: state.selectedParentId,
    setSelectedGrandParentId: state.setSelectedGrandParentId,
    setSelectedParentId: state.setSelectedParentId,
    uniqueItems: state.uniqueItems,
    isCategoriesOpen: state.isCategoriesOpen,
    setIsCategoriesOpen: state.setIsCategoriesOpen,
    fetchProductsByCategoryId: state.fetchProductsByCategoryId,
    setSelectedCategoryId: state.setSelectedCategoryId,
  }));
  ////////

  useEffect(() => {
    // Sahifa URL-ni saqlash
    localStorage.setItem("previousPage", location.pathname);
  }, [location.pathname]);

  const selectedCategoryId2 = null;

  const { grandParents, fetchGrandParents, parents, fetchParents } =
    useManuStore((state) => ({
      grandParents: state.grandParents,
      fetchGrandParents: state.fetchGrandParents,
      parents: state.parents,
      fetchParents: state.fetchParents,
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
    // localStorage.setItem("activeButton", buttonName);
    setCategoryTitle(buttonName);
    const categoryTitle = t("sidebar.categories"); // Tarjima qilingan sarlavhani olish
    setCategoryTitle(buttonName);
    console.log("sidebar", categoryTitle);
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
    fetchGrandParents();
  }, [fetchGrandParents]);

  useEffect(() => {
    if (selectedCategoryId2 !== null) {
      fetchParents(selectedCategoryId2);
    }
  }, [selectedCategoryId2]);
  console.log("parent", grandParents);
  console.log("child", parents);

  const handleGrandParentClick = (parentId) => {
    localStorage.setItem("linkIdForCategory", JSON.stringify(parentId));
    if (selectedGrandParentId === parentId) {
      setSelectedGrandParentId(null);
      console.log(parentId);
    } else {
      setSelectedGrandParentId(parentId);
      setSelectedCategoryId(parentId);
      fetchParents(parentId);
    }
  };

  const handleRemoveParent = () => {
    setSelectedParentId(null);
    localStorage.removeItem("parent");
  };
  const handleParentClick = (childId) => {
    if (selectedParentId === childId) {
      // Tanlangan parent o'chirilmoqda
      setSelectedParentId(null);
      handleRemoveParent();
      console.log("parent sidebar", childId);
    } else {
      // Yangi parent tanlanmoqda
      setSelectedCategoryId(childId);
      fetchProductsByCategoryId(childId);

      // Tanlangan parent ID'sini localStorage'ga saqlash
      localStorage.setItem("parent", childId);
    }
  };

  /////////////////////////////////////////////
  const toggleCategories = () => {
    setSelectedGrandParentId(null);
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  console.log(selectedGrandParentId);
  const handleCloseBar = () => {
    setSelectedGrandParentId(null);
    handleCloseSidebar();
  };

  console.log("fiter ids", uniqueItems);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isWideScreen || openSidebar ? "open" : "closed"}`}>
      <div className="left">
        <div className="first">
          <Link to="/" className="logo">
            <Button variant="text">
              <img src={logo} alt="logo" width={30} height={30} />
              <span>Datasuperman</span>
            </Button>
          </Link>
          <Link to="/" onClick={() => handleButtonClick(t("sidebar.home"))}>
            <Button
              style={{
                background:
                  activeButton === t("sidebar.home")
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
              handleButtonClick(t("sidebar.categories"));
              toggleCategories();
            }}
            style={{
              margin: "5px 0px",
              background:
                activeButton === t("sidebar.categories")
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
              {grandParents
                .filter(
                  (p) =>
                    selectedGrandParentId === null ||
                    p.id === selectedGrandParentId
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
                        onClick={() => {
                          localStorage.setItem(
                            "grandParent",
                            JSON.stringify(p)
                          );
                          handleGrandParentClick(p.id);
                        }}
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
                        {selectedGrandParentId && (
                          <MdKeyboardDoubleArrowLeft
                            onClick={() => {
                              handleParentClick(p.id);
                            }}
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
                    {selectedGrandParentId === p.id && (
                      <>
                        <div className="children">
                          {Array.isArray(parents) &&
                            parents.length > 0 &&
                            parents.map((parent, index) => (
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
                                    parent.title.toLowerCase()
                                  )}`}
                                  onClick={() =>
                                    handleButtonClick(parent.title)
                                  }>
                                  <Button
                                    onClick={() => {
                                      handleParentClick(parent.id);
                                      localStorage.setItem(
                                        "parent",
                                        JSON.stringify(parent)
                                      );
                                    }}
                                    sx={{
                                      background:
                                        activeButton === parent.title
                                          ? "linear-gradient(45deg, #9b6cff, #d1a3ff)"
                                          : "inherit",
                                    }}>
                                    <span
                                      style={{
                                        color:
                                          activeButton === parent.title
                                            ? "#7000ff"
                                            : "#fff",
                                      }}>
                                      {parent.title}
                                    </span>
                                  </Button>
                                </Link>
                              </motion.div>
                            ))}
                        </div>{" "}
                      </>
                    )}
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="rigth" onClick={handleCloseBar}></div>
    </div>
  );
};

export default Sidebar;
