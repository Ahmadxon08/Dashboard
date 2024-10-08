import { Link } from "react-router-dom";
import "./Header.scss";

import Select1 from "../select/Select";
import { Button } from "@mui/material";

import User from "../../auth/user/User";

import useMainStore from "../../store/useMainStore";
import { RiMenuFold4Fill } from "react-icons/ri";
import useCategoryStore from "../../store/useCategoryStore";
import useSearchStore from "../../store/useSearchStore";

const logo = "./assets/img/logo.png";

const Header = () => {
  const { handleOpenSidebar } = useMainStore((state) => ({
    handleOpenSidebar: state.handleOpenSidebar,
  }));
  const { handleSearchOpen } = useSearchStore((state) => ({
    handleSearchOpen: state.handleSearchOpen,
  }));
  const { setSelectedCategoryId, setIsCategoriesOpen } = useCategoryStore(
    (state) => ({
      fetchProductsByCategoryId: state.fetchProductsByCategoryId,
      setSelectedCategoryId: state.setSelectedCategoryId,
      setIsCategoriesOpen: state.setIsCategoriesOpen,
    })
  );
  const handelCloseSidebar = () => {
    setSelectedCategoryId(null);
    setIsCategoriesOpen(false);
    localStorage.removeItem("activeButton");
  };

  const handleOpenSearch = (e) => {
    e.stopPropagation(), e.preventDefault(), handleSearchOpen(true);
  };
  console.log(handleOpenSearch);

  return (
    <header>
      <div className="container1">
        <div className="h_content">
          <Button
            variant="text"
            onClick={handleOpenSidebar}
            className="sidebar_btn">
            <RiMenuFold4Fill size={26} color="#000" />
          </Button>
          <Link to="/" className="logo" onClick={handelCloseSidebar}>
            <Button variant="text">
              <img
                src={logo}
                alt="logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/logo.png";
                }}
              />
              <span>Datasuperman</span>
            </Button>
          </Link>

          <nav>
            <Select1 />
            <div className="auth">
              <User />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
