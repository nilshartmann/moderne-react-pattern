import { create } from "zustand";
import { useState } from "react";

const useLocalStore = false;

type ServingsState = {
  servings: number;
  increaseServings(): void;
  decreaseServings(): void;
};

const useServingsStoreGlobal = create<ServingsState>()((set) => ({
  servings: 4,
  increaseServings: () =>
    set((state) => {
      return {
        servings: state.servings + 1,
      };
    }),
  decreaseServings: () =>
    set((state) => {
      return {
        servings: state.servings > 1 ? state.servings - 1 : 1,
      };
    }),
}));

function useServingsStoreLocal(): ServingsState {
  const [servings, setServings] = useState(4);

  return {
    servings,
    increaseServings: () => setServings((s) => s + 1),
    decreaseServings: () => setServings((s) => (s > 1 ? s - 1 : 1)),
  };
}

export const useServingsStore = useLocalStore
  ? useServingsStoreLocal
  : useServingsStoreGlobal;
