/* eslint-disable no-unused-vars */
import { create } from "zustand";
import {
  addUser,
  allProducts,
  checkUserExists,
  fetchApi,
  fetchUsers,
  fetchProductsByType,
  fetchCategories,
} from "../utils/api";
import axios from "axios";

const main_url = "http://65.1.136.0:5050/api/";

const useStore = create((set) => ({
  items: [],
  allUsers: [],
  products: [],
  ///////
  categories: [],
  totalPages: 0,
  pathDepth: 2,
  pageNum: 2,
  itemsPerPage: 20,

  //////
  loading: false,
  show: false,
  open: false,
  error: null,
  openEdit: false,
  showEditUser: false,
  showAddUser: false,
  openDel: false,
  anchorEl: null,

  productsByName: [],
  productsByType: [],

  // Setters

  ///////////////
  setPathDepth: (depth) => set({ pathDepth: depth, pageNum: 1 }),
  setPageNum: (pageNum) => set({ pageNum }),

  //////////
  setItems: (items) => set({ items }),
  setProducts: (products) => set({ products }),
  setAllUsers: (users) => set({ allUsers: users }),
  setCategories: (categories) => set({ categories }),
  setProductsByName: (productsByName) => set({ productsByName }),
  setProductsByType: (productsByType) => set({ productsByType }),
  setShow: (show) => set({ show }),
  setShowEditUser: (showEditUser) => set({ showEditUser }),
  setShowAddUser: (showAddUser) => set({ showAddUser }),
  setLoading: (loading) => set({ loading }),
  setOpenDel: (open) => set({ openDel: open }),

  setOpenEdit: (openEdit) => set({ openEdit: openEdit }),
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

  // Search products by type with pagination
  fetchProductsByType: async (rating, isEco, pageNum) => {
    set({ loading: true, error: null });
    try {
      const result = await fetchProductsByType(rating, isEco, pageNum);
      set({ productsByType: result.payLoad });
    } catch (error) {
      console.log(error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch categories with pagination
  fetchCategories: async () => {
    set({ loading: true, error: null });
    const { pathDepth, pageNum, itemsPerPage } = useStore.getState();
    try {
      const res = await axios.post("http://65.1.136.0:5050/api/category", {
        jss: { pathDepth },
        pageNum: pageNum.toString(),
      });

      const totalCount = res.data.totalCount || 0;
      const totalPages =
        itemsPerPage > 0 ? Math.ceil(totalCount / itemsPerPage) : 0;

      set({
        categories: res.data.payLoad,
        totalPages,
      });
    } catch (error) {
      console.log(error);
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

  /////show edit
  handleShowEditUser: (user) => set({ showEditUser: true }),
  handleEditOpen: () => set({ openEdit: true }),
  handleEditClose: () => set({ openEdit: false }),
  ///////show Add
  handleShowAddUser: () => set({ showAddUser: true }),
  handleAddCloser: () => set({ showAddUser: false }),
}));

export default useStore;
