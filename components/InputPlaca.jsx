import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { PlacasStore } from "../src/app/hook/store";
import { Add } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #b1b1b1ff",
  boxShadow: 24,
  p: 3,
 display: "flex",
};

const InputPlaca = () => {
  const [open, setOpen] = useState(false);
  const [placa, setplaca] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { addPlaca } = PlacasStore();

  const RegistrarPlaca = () => {
    addPlaca(placa);
    handleClose();
  }

  return (
    <div>
    <form action="">
      <Button 
      onClick={handleOpen} 
      color="success" 
      variant="contained"
      startIcon={<Add/>}
      >Agregar Placa</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField placeholder="Ingrese la placa" onChange={(e) => setplaca(e.target.value)}/>
        <Button 
        variant="contained" 
        color="success" 
        sx={{marginLeft:"5px"}}
        onClick={RegistrarPlaca}
        >Agregar</Button>
        </Box>
      </Modal>

    </form>
    </div>
  );
};

export default InputPlaca;
