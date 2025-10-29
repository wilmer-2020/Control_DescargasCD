import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlacasFilterStore = create(
  persist(
    (set) => ({
      search: "",
      estado: "TODOS",
      setSearch: (value) => set({ search: value }),
      setEstado: (value) => set({ estado: value }),
      resetFilters: () => set({ search: "", estado: "TODOS" }),
    }),
    {
      name: "filtros-placas", // se guarda en localStorage
    }
  )
);
