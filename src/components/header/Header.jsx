import { Link } from "react-router-dom";
import "./Header.scss";

import Select1 from "../select/Select";
import { Button } from "@mui/material";

import { RiLogoutBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
const logo = "./assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="h_content">
          <Link to="/" className="logo">
            <Button variant="text">
              <img src={logo} alt="logo" />

              <span>TransEuro</span>
            </Button>
          </Link>

          <nav>
            <Select1 />
            <div className="auth">
              <Button variant="text">
                <RiLogoutBoxRLine size={22} color="#000" />
                <span>Login</span>
              </Button>
              <Button variant="text">
                <RiLogoutBoxLine size={22} color="#000" />
                <span>Log out</span>
              </Button>
              <Button variant="text">
                <MdOutlineAccountCircle size={22} color="#000" />
                <span>Profile</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
