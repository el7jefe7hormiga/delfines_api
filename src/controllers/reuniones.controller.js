const { pool } = require('../db.js');

const getReuniones = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reuniones");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getReunion = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM reuniones WHERE id = ?", [id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Reunion no encontrada!" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const deleteReunion = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM reuniones WHERE id = ?", [id]);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Reunion no encontrada!" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const createReunion = async (req, res) => {
  try {
    const { fecha, tipo } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO reuniones (fecha, tipo) VALUES (?, ?)", [fecha, tipo]);
    //res.status(201).json({ fecha, tipo });
    res.status(201).json({ info: rows, data: req.body })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const updateReunion = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, tipo } = req.body;
    const [result] = await pool.query(
      "UPDATE reuniones SET fecha = IFNULL(?, fecha), tipo = IFNULL(?, tipo) WHERE id = ?", [fecha, tipo, id]);
    //console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Reunion no encontrado!" });
    const [rows] = await pool.query("SELECT * FROM reuniones WHERE id = ?", [id]);
    //console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

module.exports = {
  getReunion,
  getReuniones,
  createReunion,
  deleteReunion,
  updateReunion
}
