// import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { MdManageAccounts, MdOutlineAccountCircle } from "react-icons/md";
import { useApiContext } from "../../context/Context";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Profile from "../profile/Profile";

const User = () => {
  const { handleShow, anchorEl, open, handleCloser, handleClick } =
    useApiContext();

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MdOutlineAccountCircle size={22} color="#000" />
        <span>Profile</span>
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
          <MdManageAccounts size={20} /> <span>My account</span>
        </MenuItem>
        <MenuItem onClick={handleCloser} style={{ gap: "5px" }}>
          <RiLogoutCircleRLine size={20} />
          <span> Logout</span>
        </MenuItem>
      </Menu>
      <Profile />
    </div>
  );
};
export default User;
