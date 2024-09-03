import { create } from "zustand";

const useMainStore = create((set) => ({
  openSidebar: false,
  activeButton: "",

  // Method to open the sidebar
  handleOpenSidebar: () => set({ openSidebar: true }),

  // Method to close the sidebar
  handleCloseSidebar: () => set({ openSidebar: false }),

  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),

  setActiveButton: (buttonName) => set({ activeButton: buttonName }),
}));

export default useMainStore;
