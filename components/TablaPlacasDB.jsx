"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Divider,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { usePlacasFilterStore } from "../src/app/hook/adminfiltros";
import TuneIcon from '@mui/icons-material/Tune';
import BotonSesion from "./BotonSesion";

const TablaPlacasDB = ({ placas, recargar }) => {
  const router = useRouter();

  // 🔹 Filtros desde Zustand
  const { search, estado, setSearch, setEstado, resetFilters } = usePlacasFilterStore();

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.replace("/login");
  };

  // 🔹 Eliminar una placa
  const eliminarPlaca = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar placa?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await fetch(`/api/placas/${id}`, { method: "DELETE" });
      Swal.fire("Eliminada", "La placa ha sido eliminada.", "success");
      recargar();
    } catch (error) {
      console.error("Error al eliminar:", error);
      Swal.fire("Error", "No se pudo eliminar la placa.", "error");
    }
  };

  // 🔹 Filtrado de placas según búsqueda y estado
  const placasFiltradas = placas.filter((p) => {
    const matchSearch = p.placa.toLowerCase().includes(search.toLowerCase());
    const matchEstado = estado === "TODOS" || p.estado === estado;
    return matchSearch && matchEstado;
  });

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      {/* Encabezado */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Placas registradas en la base de datos
        </Typography>
        <BotonSesion width={'200px'}/>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* 🔹 Controles de Filtro */}
      <Box display="flex" gap={2} alignItems="center" mb={2} flexWrap="wrap">
        <TextField
          label="Buscar placa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          size="small"
        />

        <TextField
          select
          label="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          size="small"
        >
          <MenuItem value="TODOS">Todos</MenuItem>
          <MenuItem value="PENDIENTE">Pendientes</MenuItem>
          <MenuItem value="PEGADO">Pegados</MenuItem>
        </TextField>

        <Button variant="contained" onClick={resetFilters} startIcon={<TuneIcon />}>
          Limpiar filtros
        </Button>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Placa</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Sincronización</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Observación</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {placasFiltradas.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.placa}</TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "15px",
                      backgroundColor:
                        item.estado === "PENDIENTE" ? "#fee6c7ff" : "#dcfce7",
                      color:
                        item.estado === "PENDIENTE" ? "#dd5500ff" : "#166534",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.estado}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "15px",
                      width: "140px",
                      backgroundColor: "#d1fae5",
                    }}
                  >
                    <Typography sx={{ color: "#065f46", fontSize: "0.875rem" }}>
                      SINCRONIZADO
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.observacion || "Ninguna"}</TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => eliminarPlaca(item.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {placasFiltradas.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay placas que coincidan con los filtros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TablaPlacasDB;
