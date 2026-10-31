const HistorialMedico = require("../models/historialMedico");

//Trae todos los historiales médicos
exports.getHistoriales = async (req, res) => {
  try {
    const historiales = await HistorialMedico.find();
    res.json(historiales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Crear un nuevo historial médico
exports.addHistorial = async (req, res) => {
  const { fecha, diagnostico, tratamiento, notas } = req.body;
  const newHistorial = new HistorialMedico({
    fecha,
    diagnostico,
    tratamiento,
    notas,
  });
  try {
    await newHistorial.save();
    res.status(201).json(newHistorial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Actualizar un historial médico existente
exports.updateHistorial = async (req, res) => {
  const { id } = req.params;
  const { fecha, diagnostico, tratamiento, notas } = req.body;
  try {
    const updatedHistorial = await HistorialMedico.findByIdAndUpdate(
      id,
      { fecha, diagnostico, tratamiento, notas },
      { new: true },
    );
    if (!updatedHistorial) {
      return res
        .status(404)
        .json({ message: "Historial médico no encontrado" });
    } else {
      res.json(updatedHistorial);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Eliminar un historial médico existente
exports.deleteHistorial = async (req, res) => {
  const { id } = req.params;
  try {
    await HistorialMedico.findByIdAndDelete(id);
    res.status(200).json({ message: "Historial médico eliminado" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
