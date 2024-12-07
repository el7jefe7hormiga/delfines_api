const pool = require('../db.js');
const { body, validationResult } = require("express-validator");

const validateJugador = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio."),
  body("sexo").isIn(["M", "F"]).withMessage("El sexo debe ser 'M' o 'F'."),
  body("fdn").isDate().withMessage("La fecha de nacimiento debe ser válida."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];


const getJugadores = async (req, res) => {
  try {
    console.log('Buscando jugadores....');
    const [rows] = await pool.query("SELECT id, nombre, sexo, date_format(fdn, '%Y-%m-%d') AS fdn, direccion, escuela, padres, telefono, talla FROM jugadores");
    res.json(rows);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getJugador = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT id, nombre, sexo, date_format(fdn, '%Y-%m-%d') AS fdn, direccion, escuela, padres, telefono, talla FROM jugadores WHERE id = ?", [
      id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Jugador no encontrado!" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const deleteJugador = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM jugadores WHERE id = ?", [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Jugador no encontrado!" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error?.message || error, message: "Algo salió mal :(" });
  }
};

/*
const createJugador = async (req, res) => {
  try {
    const { nombre, sexo, fdn, direccion, escuela, padres, telefono, talla } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO jugadores (nombre, sexo, fdn, direccion, escuela, padres, telefono, talla) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, sexo, fdn, direccion, escuela, padres, telefono, talla]
    );
    res.status(201).json({ info: rows, data: req.body })
  } catch (error) {
    return res.status(500).json({ error: error.message, message: "Algo salió mal :(" });
  }
};*/
const createJugador = async (req, res) => {
  try {
    const { nombre, sexo, fdn, direccion, escuela, padres, telefono, talla } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO jugadores (nombre, sexo, fdn, direccion, escuela, padres, telefono, talla) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, sexo, fdn, direccion, escuela, padres, telefono, talla]
    );
    res.status(201).json({
      success: true,
      message: "Jugador creado con éxito",
      data: req.body,
      info: rows
    });
  } catch (error) {
    console.error("Error al crear jugador:", error);
    return res.status(500).json({
      success: false,
      message: "Algo salió mal. Inténtalo más tarde."
    });
  }
};


const updateJugador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, sexo, fdn, direccion, escuela, padres, telefono, talla } = req.body;

    // Verifica que el ID sea válido
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ success: false, message: "ID inválido, debe ser un número" });
    }

    const [result] = await pool.query(
      `UPDATE jugadores 
       SET 
         nombre = IFNULL(?, nombre), 
         sexo = IFNULL(?, sexo), 
         fdn = IFNULL(?, fdn), 
         direccion = IFNULL(?, direccion), 
         escuela = IFNULL(?, escuela), 
         padres = IFNULL(?, padres), 
         telefono = IFNULL(?, telefono), 
         talla = IFNULL(?, talla) 
       WHERE id = ?`,
      [nombre, sexo, fdn, direccion, escuela, padres, telefono, talla, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jugador no encontrado!" });
    }
    const [rows] = await pool.query("SELECT * FROM jugadores WHERE id = ?", [id]);
    res.json({
      success: true,
      message: "Jugador actualizado con éxito",
      data: rows[0]
    });
  } catch (error) {
    console.error("Error al actualizar jugador:", error);
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

module.exports = {
  getJugador,
  getJugadores,
  createJugador, validateJugador,
  deleteJugador,
  updateJugador
}