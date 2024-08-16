// App.js
import { Route, Routes } from "react-router-dom";
import Router from "./router/Router";
import Private from "./auth/private/Private";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import "react-toastify/dist/ReactToastify.css";
import Home from "./page/home/Home";
import Categories from "./page/categories/Categories";
import Users from "./page/users/Users";
import NotFound from "./page/not-found/NotFound";
import SingleCard from "./components/singleCard/SingleCard";

const App = () => {
  const isLogened = JSON.parse(localStorage.getItem("user")) !== null;

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<Private isLogened={isLogened} />}>
            <Route path="/" element={<Router />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
              <Route path="/single/:id" element={<SingleCard />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
