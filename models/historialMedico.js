const mongoose = require("mongoose");

const historialMedico = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  diagnostico: {
    type: String,
    required: true,
  },
  tratamiento: {
    type: String,
    required: true,
  },
  notas: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("HistorialMedico", historialMedico);
