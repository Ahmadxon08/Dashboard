import { Link } from "react-router-dom";
import "./Header.scss";

import Select1 from "../select/Select";
import { Button } from "@mui/material";

import User from "../../auth/user/User";

const logo = "./assets/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container1">
        <div className="h_content">
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
