const pool = require('../db.js');

const getJugadores = async (req, res) => {
  try {
    console.log('Buscando jugadores....');
    const [rows] = await pool.query("SELECT nombre, sexo, date_format(fdn, '%Y-%m-%d') AS fdn, direccion, escuela, padres, telefono, talla FROM jugadores");
    res.json(rows);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getJugador = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT nombre, sexo, date_format(fdn, '%Y-%m-%d') AS fdn, direccion, escuela, padres, telefono, talla FROM jugadores WHERE id = ?", [
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

const createJugador = async (req, res) => {
  try {
    const { nombre, sexo, fdn, direccion, escuela, padres, telefono, talla } = req.body;
    const fecha = formatDate(new Date());
    const [rows] = await pool.query(
      "INSERT INTO jugadores (nombre, sexo, fdn, direccion, escuela, padres, telefono, talla) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, sexo, fdn, direccion, escuela, padres, telefono, talla]
    );
    //res.status(201).json({ nombre, sexo, fdn, direccion, escuela, padres, telefono, talla });
    res.status(201).json({ info: rows, data: req.body })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const updateJugador = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, sexo, fdn, direccion, escuela, padres, telefono, talla } = req.body;
    //const fecha = formatDate(new Date());
    //console.log('updatedAt', fecha);
    const [result] = await pool.query(
      "UPDATE jugadores SET nombre = IFNULL(?, nombre), sexo = IFNULL(?, sexo), fdn = IFNULL(?, fdn), direccion = IFNULL(?, direccion), escuela = IFNULL(?, escuela), padres = IFNULL(?, padres), telefono = IFNULL(?, telefono), talla = IFNULL(?, talla) WHERE id = ?",
      [nombre, sexo, fdn, direccion, escuela, padres, telefono, talla, id]
    );
    //console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Jugador no encontrado!" });
    const [rows] = await pool.query("SELECT * FROM jugadores WHERE id = ?", [id]);
    //console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

module.exports = {
  getJugador,
  getJugadores,
  createJugador,
  deleteJugador,
  updateJugador
}