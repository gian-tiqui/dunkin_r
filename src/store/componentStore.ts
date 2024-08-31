import { create } from "zustand";

interface State {
  selectedComponent: string;
  setSelectedComponent: (selectedComponent: string) => void;
}

const useComponentStore = create<State>((set) => ({
  selectedComponent: "Donuts",
  setSelectedComponent: (selectedComponent: string) =>
    set({ selectedComponent }),
}));

export default useComponentStore;
