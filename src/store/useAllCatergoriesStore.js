import { create } from "zustand";
import axios from "axios";

const useAllCategoriesStore = create((set, get) => ({
  categories: [],
  pageNum: 1,
  pathDepth: 2,
  totalPages: 0,
  loading: false,
  itemsPerPage: 20,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.post("http://65.1.136.0:5050/api/category", {
        jss: { pathDepth: get().pathDepth },
        pageNum: get().pageNum.toString(),
      });
      set({
        categories: response.data.payLoad || [],
        totalPages: Math.ceil(response.data.total / get().itemsPerPage),
      });
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      set({ loading: false });
    }
  },

  setPageNum: (pageNum) => {
    set({ pageNum });
    get().fetchCategories();
  },

  setPathDepth: (pathDepth) => {
    set({ pathDepth, pageNum: 1 });
    get().fetchCategories();
  },
}));

export default useAllCategoriesStore;
