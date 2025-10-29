"use client";

import {
  Paper,
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import { useMemo } from "react";
import { useFiltroStore } from "../src/app/hook/filtrosStore";
import IndicadoresTablaUsuario from "./IndicadoresTablaUsuario";
import BotonSesion from "./BotonSesion";

const TablaPlacasMovil = ({ placas, recargar }) => {
  // 🧠 Filtros globales desde Zustand
  const { filtroTexto, filtroEstado, setFiltroTexto, setFiltroEstado } =
    useFiltroStore();

  // 🔹 Calcular estadísticas globales
  const totalPendientes = placas.filter((p) => p.estado === "PENDIENTE").length;
  const totalPegadas = placas.filter((p) => p.estado === "COLOCADA").length;

  // 🔹 Filtro combinado: búsqueda + estado
  const placasFiltradas = useMemo(() => {
    return placas.filter((item) => {
      const coincideBusqueda = item.placa
        .toLowerCase()
        .includes(filtroTexto.toLowerCase());
      const coincideEstado =
        filtroEstado === "TODAS" ? true : item.estado === filtroEstado;
      return coincideBusqueda && coincideEstado;
    });
  }, [placas, filtroTexto, filtroEstado]);

  // 🔹 Cambiar estado a "COLOCADA"
  const cambiarEstado = async (id) => {
    try {
      await fetch("/api/placas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, estado: "COLOCADA" }),
      });
      recargar();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      Swal.fire("Error", "No se pudo actualizar el estado.", "error");
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
        Placas del día
      </Typography>

      <BotonSesion width={"100%"}/>

      {/* 🔹 Indicadores */}
      <IndicadoresTablaUsuario
        placas={placas}
        totalPegadas={totalPegadas}
        totalPendientes={totalPendientes}
      />

      {/* 🔹 Filtros globales */}
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Buscar placa"
          variant="outlined"
          fullWidth
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Filtrar por estado</InputLabel>
          <Select
            value={filtroEstado}
            label="Filtrar por estado"
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <MenuItem value="TODAS">Todas</MenuItem>
            <MenuItem value="PENDIENTE">Pendientes</MenuItem>
            <MenuItem value="COLOCADA">Colocadas</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* 🔹 Tabla filtrada */}
      {placasFiltradas.length === 0 ? (
        <Typography color="text.secondary" align="center">
          No se encontraron placas.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {placasFiltradas.map((item, index) => (
            <Paper
              key={item.id}
              elevation={2}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#f8fafc",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {index + 1}. {item.placa}
                </Typography>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.3,
                    borderRadius: "15px",
                    backgroundColor:
                      item.estado === "PENDIENTE" ? "#fee6c7ff" : "#dcfce7",
                    color:
                      item.estado === "PENDIENTE" ? "#dd5500ff" : "#166534",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  {item.estado}
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary">
                Observación: {item.observacion || "Ninguna"}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5 }}
              >
                Fecha: {new Date(item.createdAt).toLocaleDateString()}
              </Typography>

              {/* 🔹 Mostrar botón solo si está pendiente */}
              {item.estado === "PENDIENTE" && (
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 1.5,
                    backgroundColor: "#22c55e",
                    "&:hover": { backgroundColor: "#16a34a" },
                  }}
                  onClick={() => cambiarEstado(item.id)}
                >
                  Marcar como COLOCADA
                </Button>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default TablaPlacasMovil;
