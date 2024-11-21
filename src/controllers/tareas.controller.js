const pool = require('../db.js');

const getTareas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tareas");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM tareas WHERE id = ?", [id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Tarea no encontrada!" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM tareas WHERE id = ?", [id]);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Tarea no encontrada!" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const createTarea = async (req, res) => {
  try {
    const { tarea } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO tareas (tarea) VALUES (?)", [tarea]);
    //res.status(201).json({ tarea });
    res.status(201).json({ info: rows, data: req.body })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const updateTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { tarea } = req.body;
    const [result] = await pool.query(
      "UPDATE tareas SET tarea = IFNULL(?, tarea) WHERE id = ?", [tarea, id]);
    //console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tarea no encontrado!" });
    const [rows] = await pool.query("SELECT * FROM tareas WHERE id = ?", [id]);
    //console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

module.exports = {
  getTarea,
  getTareas,
  createTarea,
  deleteTarea,
  updateTarea
}
