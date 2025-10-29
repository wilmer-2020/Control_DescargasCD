import { create } from "zustand";

export const useFiltroStore = create((set) => ({
  // 🔹 Estados globales
  filtroTexto: "",
  filtroEstado: "TODAS",

  // 🔹 Acciones
  setFiltroTexto: (texto) => set({ filtroTexto: texto }),
  setFiltroEstado: (estado) => set({ filtroEstado: estado }),
  limpiarFiltros: () => set({ filtroTexto: "", filtroEstado: "TODAS" }),
}));
