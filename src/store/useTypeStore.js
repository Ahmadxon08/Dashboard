// store.js
import axios from "axios";
import { create } from "zustand";

const useTypeStore = create((set, get) => ({
  products: [],
  total: 0,
  pageNum: 1,
  rating: 5,
  isEco: false,
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://65.1.136.0:5050/api/productsByType",
        {
          jss: { rating: get().rating, isEco: get().isEco },
          pageNum: get().pageNum.toString(),
        }
      );
      set({
        products: response?.data.payLoad || [],
        total: response?.data.total || 0,
      });
    } catch (error) {
      set({ error: error.message });
      console.error("Xatolik yuz berdi:", error);
    } finally {
      set({ loading: false });
    }
  },

  setPageNum: (pageNum) => set({ pageNum }),
  setRating: (rating) => set({ rating }),
  setIsEco: (isEco) => set({ isEco }),

  handlePageChange: (event, newPage) => set({ pageNum: newPage }),

  handleFilterSubmit: () => {
    set({ pageNum: 1 });
    set((state) => state.fetchProducts());
  },
}));

export default useTypeStore;
