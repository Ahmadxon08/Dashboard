import { Route, Routes } from "react-router";
import Router from "./router/Router";
import ApiContextProvider from "./context/Context";
import Private from "./auth/private/Private";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";

const App = () => {
  // Foydalanuvchi kirganligini tekshirish
  const isLogened = JSON.parse(localStorage.getItem("isLogened")) || false;

  return (
    <ApiContextProvider>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Private isLogened={isLogened} />}>
            <Route path="/" element={<Router />} />
          </Route>
        </Routes>
      </div>
    </ApiContextProvider>
  );
};

export default App;
