// User.js
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { MdManageAccounts, MdOutlineAccountCircle } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Profile from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";

const User = () => {
  // Translation setup
  const { t } = useTranslation();

  // Store state and actions
  const { handleClick, handleCloser, anchorEl, openDel, handleShow } = useStore(
    (state) => ({
      openDel: state.openDel,
      handleCloser: state.handleCloser,
      anchorEl: state.anchorEl,
      handleClick: state.handleClick,
      handleShow: state.handleShow,
    })
  );

  // Logout functionality
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    handleCloser(); // Close the menu after logout
  };

  return (
    <div>
      <Button
        id="fade-button"
        style={{ backgroundColor: "#f5f5f5" }}
        aria-controls={openDel ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openDel ? true : undefined}
        onClick={handleClick}>
        <MdOutlineAccountCircle size={22} color="#000" />
        <span>{user?.username || "Profile"}</span>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloser}
        TransitionComponent={Fade}>
        <MenuItem
          onClick={() => {
            handleShow();
            handleCloser();
          }}
          style={{ gap: "5px" }}>
          <MdManageAccounts size={20} />
          <span>{t("header.account")}</span>
        </MenuItem>
        <MenuItem onClick={handleLogOut} style={{ gap: "5px" }}>
          <RiLogoutCircleRLine size={20} />
          <span>{t("header.logout")}</span>
        </MenuItem>
      </Menu>
      <Profile />
    </div>
  );
};

export default User;
