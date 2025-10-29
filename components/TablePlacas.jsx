import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Delete } from "@mui/icons-material";
import { PlacasStore } from "../src/app/hook/store"
import InputPlaca from "./InputPlaca";
import { useState } from "react";
import { useRouter } from "next/navigation";

const TablaPlacas = () => {
    const router = useRouter();
    const { clearPlacas,removePlaca,placas } = PlacasStore();
    const [isOk, setisOk] = useState(false)

    const limpiarTodo = () => {
    clearPlacas();
    router.push('/admin');
  };
  console.log(placas);
  const hadleUoploadToDB = async() => {
    try {
      const response = await fetch('/api/placas', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({ placa: placas })
      });
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
      setisOk(true);
      router.push('/pages/placasDB');
    } catch (error) {
      console.error('Error al subir las placas:', error);
    }
  }

  return (
    <>
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Placas cargadas desde: CSV
            </Typography>
            {isOk ? (
              <Box
                sx={{ background: "#d1fae5", padding: "5px 10px", borderRadius: "15px" }}>
                <Typography color="#065f46">¡Placas cargadas con éxito!</Typography>
              </Box>
            ) : 
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CloudUploadIcon />}
                onClick={hadleUoploadToDB}
              >
                Cargar a la base de datos
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<DeleteOutlineIcon />}
                onClick={limpiarTodo}
              >
                Limpiar todo
              </Button>
              <InputPlaca/>
            </Box>
            }
            
          </Box>
          <Divider sx={{ mb: 2 }} />

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Placa</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {placas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.placa}</TableCell>
                    <TableCell>
                      <Box 
                      sx={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        backgroundColor: item.pegada ? "#d1fae5" : "#fee2e2",
                        display: "inline-block",
                      }}
                      >
                       <Typography color={item.pegada ? "#065f46" : "#991b1b"}>
                        {item.pegada ? "Sincronizadas" : "Sin Sincronizar"}  
                       </Typography> 
                      </Box>
                        
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => removePlaca(index)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    </>
  )
}

export default TablaPlacas