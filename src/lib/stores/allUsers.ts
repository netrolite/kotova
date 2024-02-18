import { create } from "zustand";

type AllUsersStore = {
  query: string;
  setQuery: (val: string) => void;
};

const useAllUsersStore = create<AllUsersStore>()((set) => ({
  query: "",
  setQuery: (val) => set({ query: val }),
}));

export default useAllUsersStore;
