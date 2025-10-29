import { Box, Chip } from "@mui/material";
const IndicadoresTablaUsuario = ({totalPendientes,totalPegadas,placas}) => {
  return (
    <>
        
      {/* 🔹 Indicadores de progreso */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Chip
          label={`Pendientes: ${totalPendientes}`}
          color="warning"
          sx={{ fontWeight: "bold" }}
        />
        <Chip
          label={`Pegadas: ${totalPegadas}`}
          color="success"
          sx={{ fontWeight: "bold" }}
        />
        <Chip
          label={`Total: ${placas.length}`}
          color="primary"
          sx={{ fontWeight: "bold" }}
        />
      </Box>
    </>
  )
}

export default IndicadoresTablaUsuario