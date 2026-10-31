const express = require("express");
const router = express.Router();
const {
  getHistoriales,
  addHistorial,
  updateHistorial,
  deleteHistorial,
} = require("../controllers/historialMedicoController");

router.get("/", getHistoriales);
router.post("/", addHistorial);
router.put("/:id", updateHistorial);
router.delete("/:id", deleteHistorial);

module.exports = router;
