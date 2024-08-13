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
  const { handleClick, open, handleCloser, anchorEl, handleShow } = useStore(
    (state) => ({
      open: state.open,
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
    handleCloser();
  };

  return (
    <div>
      <Button
        id="fade-button"
        style={{ backgroundColor: "#f5f5f5" }} // Correct way to set the background color
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? true : undefined}
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
