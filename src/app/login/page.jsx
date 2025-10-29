"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { users } from "../../libs/credenciales";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // 🔹 Usuarios simulados (luego puedes reemplazar con Supabase)
   
    // Buscar coincidencia de usuario
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Credenciales incorrectas. Intenta nuevamente.");
      return;
    }

    // 🔹 Guardamos el rol en localStorage
    localStorage.setItem("userRole", foundUser.role);

    // 🔹 Redirigimos según el rol
    if (foundUser.role === "admin") {
      try {
        const response = await fetch("/api/placas", { cache: "no-store" });
        const placas = await response.json();

        if (placas.length > 0) {
          // Si ya hay placas → ir a la tabla
          router.replace("/pages/placasDB");
        } else {
          // Si no hay → ir al drag para subir CSV
          router.replace("/admin");
        }
      } catch (err) {
        console.error("Error al obtener placas:", err);
        router.replace("/admin");
      }
    } else {
      // Si es usuario del CD
      router.replace("/user");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f5f9",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ fontWeight: "bold" }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
