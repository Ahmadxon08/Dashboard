/* eslint-disable no-unused-vars */
import { create } from "zustand";
import {
  addUser,
  allProducts,
  checkUserExists,
  fetchApi,
  fetchUsers,
} from "../utils/api";

const useStore = create((set) => ({
  items: [],
  allUsers: [],
  products: [],
  loading: false,
  show: false,
  open: false,
  error: null,
  openEdit: false,
  showEditUser: false,
  showAddUser: false,
  openDel: false,
  anchorEl: null,
  openSearch: false,

  // Setters
  setItems: (items) => set({ items }),
  setProducts: (products) => set({ products }),
  setAllUsers: (users) => set({ allUsers: users }),
  setShow: (show) => set({ show }),
  setShowEditUser: (showEditUser) => set({ showEditUser }),
  setShowAddUser: (showAddUser) => set({ showAddUser }),
  setLoading: (loading) => set({ loading }),
  setOpenDel: (open) => set({ openDel: open }),
  setOpenSearch: (openSearch) => set({ openSearch }),
  setOpenEdit: (openEdit) => set({ openEdit }),
  setAnchorEl: (anchor) => set({ anchorEl: anchor }),

  // Fetch Users
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await fetchUsers();
      set({ allUsers: users });
    } catch (error) {
      console.log(error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Add User
  addUser: async (newUser) => {
    set({ loading: true, error: null });
    try {
      await addUser(newUser);
      set((state) => ({
        allUsers: [newUser, ...state.allUsers],
      }));
    } catch (error) {
      console.log(error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Check User Exists
  checkUserExists: async (username) => {
    try {
      return await checkUserExists(username);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  // Fetch API Data
  fetchApi: async () => {
    try {
      const items = await fetchApi();
      set({ items });
    } catch (error) {
      console.log(error);
    }
  },

  // Get all Products
  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await allProducts();
      set({ products });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Handlers
  handleClick: (e) => set({ anchorEl: e.currentTarget }),
  handleCloser: () => set({ anchorEl: null }),
  handleClose: () => set({ show: false }),
  handleShow: () =>
    set((state) => ({
      show: true,
      anchorEl: null,
    })),
  handleDeleteOpen: () => set({ openDel: true }),
  handleDeleteClose: () => set({ openDel: false }),

  handleShowEditUser: (user) => set({ showEditUser: true }),
  handleEditOpen: () => set({ openEdit: true }),
  handleEditClose: () => set({ openEdit: false }),

  handleAddCloser: () => set({ showAddUser: false }),
  ////serchOpen Close
  handleSearchOpen: () => set({ openSearch: true }),
  handleSearchClose: () => set({ openSearch: false }),
}));

export default useStore;
