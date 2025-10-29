"use client";
import { useEffect, useState } from "react";
import TablaPlacasMovil from "../../../components/TablaUsuarios";

export default function UserPage() {
  const [placas, setPlacas] = useState([]);

  const cargarPlacas = async () => {
    const res = await fetch("/api/placas");
    const data = await res.json();
    setPlacas(data);
  };

  useEffect(() => {
    cargarPlacas();
  }, []);

  return <TablaPlacasMovil placas={placas} recargar={cargarPlacas} />;
}
