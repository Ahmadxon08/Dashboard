import { Button } from "@mui/material";
import "./Side.scss";
import { GoHome } from "react-icons/go";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="left">
      <div className="first">
        <Button>
          <GoHome size={22} />
          <span>{t("sidebar.home")} </span>
        </Button>
        <Button>
          <AiOutlineOrderedList size={22} />
          <span> {t("sidebar.categories")}</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
