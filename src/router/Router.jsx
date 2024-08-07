import Content from "../page/content/Content";
import Sidebar from "../components/side/Sidebar";
import Header from "../components/header/Header";
import "./Router.scss";
const Router = () => {
  return (
    <>
      <Header />
      <div className="router">
        <Sidebar />
        <Content />
      </div>
    </>
  );
};

export default Router;
