import { Route, Routes } from "react-router";
// import Router from "./router/Router";
// import Header from "./components/header/Header";
// import Register from "./auth/register/Register";
import ApiContextProvider from "./context/Context";
import Login from "./auth/login/Login";
import Register from "./auth/register/Register";

// import Side from "./components/side/Side";

/* eslint-disable react/no-unescaped-entities */
const App = () => {
  return (
    <ApiContextProvider>
      <div className="app">
        {/* <Register /> */}

        {/* <Header /> */}
        <Routes>
          {/* <Route path="/" element={<Router />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </ApiContextProvider>
  );
};

export default App;
