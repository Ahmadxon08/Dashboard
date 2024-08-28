import { create } from "zustand";
import axios from "axios";
import debounce from "lodash.debounce";

const useSearchStore = create((set) => ({
  products: [],
  total: 0,
  pageNum: 1,
  loading: false,
  openSearch: false,
  searchText: "",
  setOpenSearch: (openSearch) => set({ openSearch }),
  setProducts: (products) => set({ products }),
  setTotal: (total) => set({ total }),
  setPageNum: (pageNum) => set({ pageNum }),
  setLoading: (loading) => set({ loading }),
  setSearchText: (searchText) => set({ searchText }),

  fetchProducts: debounce(async (searchText, pageNum) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        "http://65.1.136.0:5050/api/productsByName",
        {
          text: searchText,
          pageNum: pageNum.toString(),
        }
      );
      set({
        products: response.data.payLoad || [],
        total: response.data.total || 0,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ loading: false });
    }
  }, 500),
  //////////////////

  handleSearchOpen: () => set({ openSearch: true }),
  handleSearchClose: () => set({ openSearch: false }),
}));

export default useSearchStore;
