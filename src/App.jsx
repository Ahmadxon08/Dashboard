// App.js
import { Route, Routes } from "react-router-dom";
import Router from "./router/Router";
import Private from "./auth/private/Private";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";
import "react-toastify/dist/ReactToastify.css";
import Home from "./page/home/Home";
import NotFound from "./page/not-found/NotFound";
import ProductsByType from "./page/productsByType/ProductsByType";
import ProductsSearch from "./page/productsSearch/ProductsSearch";
import Products from "./page/products/Products";
import Backtop from "./components/backtop/Backtop";
import ProductDetail from "./components/productDetails/ProductDetail";
const App = () => {
  let isLogened = false;
  try {
    isLogened = JSON.parse(localStorage.getItem("user")) !== null;
  } catch (e) {
    isLogened = false;
  }

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<Private isLogened={isLogened} />}>
            <Route path="/" element={<Router />}>
              <Route index element={<Home />} />
              <Route path="/productsByType" element={<ProductsByType />} />
              <Route path="/productsSearch" element={<ProductsSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/typeby" element={<ProductsByType />} />
            </Route>
          </Route>
        </Routes>
        <Backtop />
      </div>
    </>
  );
};

export default App;
