import create from "zustand";

export type SideBarStore = {
  isSiderHidden: boolean;
  showSider: () => void;
  hideSider: () => void;
};

const useLayoutStore = create<SideBarStore>((set) => ({
  isSiderHidden: true,
  showSider: () => set({ isSiderHidden: false }),
  hideSider: () => set({ isSiderHidden: true }),
}));

export default useLayoutStore;
