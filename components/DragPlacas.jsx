import { useDropzone } from "react-dropzone"
import { useCallback } from "react";
import Papa from "papaparse";
import { PlacasStore } from "../src/app/hook/store";
import { Paper, Box, Typography,Button} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRouter } from "next/navigation";
import BotonSesion from "./BotonSesion";
const DragPlacas = () => {
  const router = useRouter();
    const { addPlaca } = PlacasStore();
     const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data
          .map((row) => row.placa?.trim())
          .filter(Boolean);
          addPlaca(data);
        router.push("/pages/precarga");
        console.log("Placas cargadas:", data);
      },
      error: (error) => {
        console.error("Error al leer el archivo CSV:", error);
      },
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });
  return (
    <>
         <Paper
          elevation={1}
          sx={{
            p: 3,
            border: "1px dashed #cbd5e1",
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
            width: '50%',
            height: '500px',
            margin: '100px auto',
          }}
        >
          <Box
            {...getRootProps()}
            sx={{
              p: 5,
              border: "2px dashed #94a3b8",
              borderRadius: 2,
              backgroundColor: isDragActive ? "#e2e8f0" : "#f8fafc",
              transition: "0.2s",
              cursor: "pointer",
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon sx={{ fontSize: 50, color: "#64748b", mb: 1 }} />
            <Typography fontWeight="bold">
              Arrastra aquí tu archivo CSV
            </Typography>
            <Typography variant="body2" color="text.secondary">
              o haz clic para seleccionar un archivo
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              startIcon={<UploadFileIcon />}
            >
              Seleccionar archivo
            </Button>
          </Box>
          <BotonSesion width={'180px'}/>
        </Paper>
    </>
  )
}

export default DragPlacas