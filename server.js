const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas

// Ruta de autenticación
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Ruta de pacientes
const pacienteRoutes = require("./routes/paciente");
app.use("/api/pacientes", pacienteRoutes);

// Ruta de historial médico
const historialMedicoRoutes = require("./routes/historialMedico");
app.use("/api/historiales", historialMedicoRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
