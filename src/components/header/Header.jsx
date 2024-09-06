import { Link } from "react-router-dom";
import "./Header.scss";

import Select1 from "../select/Select";
import { Button } from "@mui/material";

import User from "../../auth/user/User";

import useMainStore from "../../store/useMainStore";
import { RiMenuFold4Fill } from "react-icons/ri";

const logo = "./assets/img/logo.png";

const Header = () => {
  const { handleOpenSidebar } = useMainStore((state) => ({
    handleOpenSidebar: state.handleOpenSidebar,
  }));

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
          <Link to="/" className="logo">
            <Button variant="text">
              <img src={logo} alt="logo" />
              <span>Datasupermen</span>
            </Button>
          </Link>

          <nav>
            <Select1 />
            <div className="auth">
              <Button variant="text">
                <span>...</span>
              </Button>

              <User />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
