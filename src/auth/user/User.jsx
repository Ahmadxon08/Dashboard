// import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { MdManageAccounts, MdOutlineAccountCircle } from "react-icons/md";
import { useApiContext } from "../../context/Context";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const User = () => {
  ///////////////Translator///
  const { t } = useTranslation();

  //////////////// Log Out funtionality///////////////////////
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");

    handleCloser();
  };
  const { handleShow, anchorEl, open, handleCloser, handleClick } =
    useApiContext();
  /////////////////////////////////////////////////////
  return (
    <div>
      <Button
        id="fade-button"
        f5f5f5
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MdOutlineAccountCircle size={22} color="#000" />
        <span>{user.username ? user.username : "Profile"}</span>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloser}
        TransitionComponent={Fade}>
        <MenuItem onClick={handleShow} style={{ gap: "5px" }}>
          {" "}
          <MdManageAccounts size={20} /> <span>{t("header.account")}</span>
        </MenuItem>
        <MenuItem onClick={handleLogOut} style={{ gap: "5px" }}>
          <RiLogoutCircleRLine size={20} />
          <span> {t("header.logout")}</span>
        </MenuItem>
      </Menu>
      <Profile />
    </div>
  );
};
export default User;
