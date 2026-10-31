const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["admin", "usuario"],
    default: "usuario",
    required: true,
  },
});

// Hash the password before saving the user
usuarioSchema.pre("save", async function () {
  if (!this.isModified("contraseña")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
});

module.exports = mongoose.model("Usuario", usuarioSchema);
