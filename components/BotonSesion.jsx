import { Button } from "@mui/material"
import { useRouter } from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';
const BotonSesion = ({width}) => {

    const router = useRouter();

     const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.replace("/login");
  };

  return (
    <>
         {/* 🔹 Botón de cerrar sesión */}
              <Button
                onClick={handleLogout}
                variant="contained"
                color="error"
                sx={{ mb: 2, width: width }}
                startIcon={<LogoutIcon/>}
              >
                Cerrar sesión
              </Button>
    </>
  )
}

export default BotonSesion