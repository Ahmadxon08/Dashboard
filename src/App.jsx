/* eslint-disable no-undef */
import { Route, Routes } from "react-router";
import Router from "./router/Router";
import ApiContextProvider from "./context/Context";
import Private from "./auth/private/Private";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import "react-toastify/dist/ReactToastify.css"; // Import the styles
import Home from "./page/home/Home";
import Categories from "./page/categories/Categories";
import Users from "./page/users/Users";

const App = () => {
  // Foydalanuvchi kirganligini tekshirish
  const isLogened = JSON.parse(localStorage.getItem("user")) || false;

  return (
    <ApiContextProvider>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Private isLogened={isLogened} />}>
            <Route path="/" element={<Router />}>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </ApiContextProvider>
  );
};

export default App;
