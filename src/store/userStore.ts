import { create } from "zustand";
import { User } from "../types/types";

interface State {
  user: User | undefined;
  setUser: (user: User) => void;
}

const useUserStore = create<State>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
