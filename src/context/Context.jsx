/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  // Fetch user state
  const [allUsers, setAllUsers] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloser = () => setAnchorEl(null);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    handleCloser();
    setShow(true);
  };
  //////////////////////delete hendelers

  const handleDeleteOpen = () => {
    setOpenDel(true);
  };

  const handleDeleteClose = () => {
    setOpenDel(false);
  };

  // Add handlers
  const handleAddUser = () => setShowAddUser(true);
  const handleAddCloser = () => setShowAddUser(false);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://65.1.136.0:5050/api/allusers");
      const data = await res.data;
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user
  const addUser = async (newUser) => {
    setLoading(true);
    try {
      await axios.post("http://65.1.136.0:5050/api/adduser", newUser);
      // Fetch the newly added user
      setAllUsers((prevUsers) => [newUser, ...prevUsers]);
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////////

  //////////////////check user if there is existing user

  const checkUserExists = async (userName) => {
    try {
      const res = await axios.get(`http://65.1.136.0:5050/api/allusers`, {
        params: { username: userName },
      });
      return res.data.exists;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw error;
    }
  };
  ////////////////////////////////////

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

  return (
    <ApiContext.Provider
      value={{
        items,
        setItems,
        openDel,
        show,
        handleDeleteOpen,
        handleCloser,
        addUser,
        handleDeleteClose,
        open,
        fetchUsers,
        checkUserExists,
        handleAddCloser,
        handleAddUser,
        showAddUser,
        handleClose,
        handleClick,
        allUsers,
        loading,
        anchorEl,
        handleShow,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useApiContext = () => useContext(ApiContext);
