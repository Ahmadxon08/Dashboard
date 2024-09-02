// store/useCategoryStore.js
import { create } from "zustand";
import axios from "axios";

const useCategoryStore = create((set, get) => ({
  selectedCategoryId: null,
  currentPage: 1,
  totalPages: 1,
  products: [],
  loading: false,
  error: null,

  setSelectedCategoryId: (id) => {
    set({ selectedCategoryId: id });
  },
  setPage: (pageNum) => {
    set({ currentPage: pageNum });
    get().fetchProductsByCategoryId(get().selectedCategoryId);
  },

  fetchProductsByCategoryId: async (categoryId, pageNum = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://65.1.136.0:5050/api/productsByCategoryId",
        {
          categoryid: categoryId,
          pageNum: pageNum,
        }
      );
      set({
        products: response.data,
        totalPages: response.data.total,
        currentPage: pageNum,
      });
    } catch (err) {
      set({ error: err.massage });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useCategoryStore;
