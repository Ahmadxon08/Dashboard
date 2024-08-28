import { create } from "zustand";

const useMainStore = create((set) => ({
  openSidebar: false,

  // Method to open the sidebar
  handleOpenSidebar: () => set({ openSidebar: true }),

  // Method to close the sidebar
  handleCloseSidebar: () => set({ openSidebar: false }),

  // Optional: Method to toggle the sidebar
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
}));

export default useMainStore;
