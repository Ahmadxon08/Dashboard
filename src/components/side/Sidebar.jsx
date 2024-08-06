import { Button } from "@mui/material";
import "./Side.scss";
import { GoHome } from "react-icons/go";
import { AiOutlineOrderedList } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="left">
      <div className="first">
        <Button>
          <GoHome size={22} />
          <span> Home</span>
        </Button>{" "}
        <Button>
          <AiOutlineOrderedList size={22} />
          <span> Categaries</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
