/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  ////////////////////////////////////////
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloser = () => {
    setAnchorEl(null);
  };
  /////////////////////////////
  const handleClose = () => setShow(false);
  const handleShow = () => {
    handleCloser();
    setShow(true);
  };
  //////////////////
  const fetchApi = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      const data = await res.data;
      setItems(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  ////////////////////
  return (
    <ApiContext.Provider
      value={{
        items,
        setItems,
        show,
        handleCloser,
        open,
        handleClose,
        handleClick,
        anchorEl,
        handleShow,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

export const useApiContext = () => {
  return useContext(ApiContext);
};
