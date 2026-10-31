const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const login = async (req, res) => {
  try {
    const { nombreUsuario, contraseña } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      "secret_key",
      {
        expiresIn: "1h",
      },
    );
    res.json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor backend: " + error.message });
  }
};

const register = async (req, res) => {
  try {
    const { nombreUsuario, contraseña, rol } = req.body;
    const usuarioExistente = await Usuario.findOne({ nombreUsuario });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya está en uso" });
    }
    //const hashedPassword = await bcrypt.hash(contraseña, 10);
    const usuario = new Usuario({
      nombreUsuario,
      contraseña: contraseña,
      rol,
    });
    await usuario.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor backend: " + error.message });
  }
};

module.exports = { login, register };
