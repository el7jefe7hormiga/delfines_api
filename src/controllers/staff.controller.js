const { pool } = require('../db.js');

const getStaffs = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM staff");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM staff WHERE id = ?", [
      id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Staff no encontrado!" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM staff WHERE id = ?", [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Staff no encontrado!" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error?.message || error, message: "Algo salió mal :(" });
  }
};

const createStaff = async (req, res) => {
  try {
    const { nombre, cargo, direccion, telefono, talla } = req.body;
    //const fecha = formatDate(new Date());
    const [rows] = await pool.query(
      "INSERT INTO staff ( nombre, cargo, direccion, telefono, talla ) VALUES (?, ?, ?, ?, ?)",
      [nombre, cargo, direccion, telefono, talla]
    );
    //res.status(201).json({ nombre, cargo, direccion, telefono, talla });
    res.status(201).json({ info: rows, data: req.body })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cargo, direccion, telefono, talla } = req.body;
    //const fecha = formatDate(new Date());
    //console.log('updatedAt', fecha);
    const [result] = await pool.query(
      "UPDATE staff SET nombre = IFNULL(?, nombre), cargo = IFNULL(?, cargo), direccion = IFNULL(?, direccion), telefono = IFNULL(?, telefono), talla = IFNULL(?, talla) WHERE id = ?",
      [nombre, cargo, direccion, telefono, talla, id]
    );
    //console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Staff no encontrado!" });
    const [rows] = await pool.query("SELECT * FROM staff WHERE id = ?", [id]);
    //console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

module.exports = {
  getStaff,
  getStaffs,
  createStaff,
  deleteStaff,
  updateStaff
}