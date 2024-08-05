import { Route, Routes } from "react-router";
import Router from "./router/Router";
import Header from "./components/header/Header";
// import Side from "./components/side/Side";

/* eslint-disable react/no-unescaped-entities */
const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Router />} />
      </Routes>
    </div>
  );
};

export default App;
