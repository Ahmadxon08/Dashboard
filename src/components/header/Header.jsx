import { Link } from "react-router-dom";
import "./Header.scss";

import Select1 from "../select/Select";
import { Button } from "@mui/material";

import { RiLogoutBoxRLine } from "react-icons/ri";

import User from "../../auth/user/User";
import { LuUserPlus2 } from "react-icons/lu";
const logo = "./assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container1">
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
                <LuUserPlus2 size={22} color="#000" />
                <span>Register</span>
              </Button>
              {/* <Button variant="text">
               
              </Button> */}
              <User />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
