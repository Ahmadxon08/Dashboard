import Content from "../page/content/Content";
import Sidebar from "../components/side/Sidebar";
import "./Router.scss";
const Router = () => {
  return (
    <div className="router">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Router;
