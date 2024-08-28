import { create } from "zustand";
import { Donut } from "../types/types";

interface State {
  donuts: Donut[];
  setDonuts: (donuts: Donut[]) => void;
}

const useDonutStore = create<State>((set) => ({
  donuts: [],
  setDonuts: (donuts: Donut[]) => set({ donuts }),
}));

export default useDonutStore;
