import { create } from "zustand";

export const PlacasStore = create((set) => ({
  placas: [],

  addPlaca: (newPlaca) =>
    set((state) => {
      // Si es un arreglo, convertir cada texto en objeto
      if (Array.isArray(newPlaca)) {
        const nuevasPlacas = newPlaca.map((p) => ({
          placa: p,
          pegada: false,
          observacion: "",
        }));
        return { placas: [...state.placas, ...nuevasPlacas] };
      }

      // Si es un solo valor, también convertirlo en objeto
      const placaObj = {
        placa: newPlaca,
        pegada: false,
        observacion: "",
      };

      return { placas: [...state.placas, placaObj] };
    }),

  removePlaca: (indexToRemove) =>
    set((state) => ({
      placas: state.placas.filter((_, index) => index !== indexToRemove),
    })),

  clearPlacas: () => set({ placas: [] }),
}));
