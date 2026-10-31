const Paciente = require("../models/paciente");

//Trae todos los pacientes
exports.getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Crear un nuevo paciente
exports.addPaciente = async (req, res) => {
  const { nombre } = req.body;
  const newPaciente = new Paciente({ nombre });
  try {
    await newPaciente.save();
    res.status(201).json(newPaciente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Actualizar un paciente existente
exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const updatedPaciente = await Paciente.findByIdAndUpdate(
      id,
      { nombre },
      { new: true },
    );
    if (!updatedPaciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    } else {
      res.json(updatedPaciente);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Eliminar un paciente existente
exports.deletePaciente = async (req, res) => {
  const { id } = req.params;
  try {
    await Paciente.findByIdAndDelete(id);
    res.status(200).json({ message: "Paciente eliminado" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
