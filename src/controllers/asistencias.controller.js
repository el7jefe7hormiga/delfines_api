const pool = require('../db.js');

const getAsistencias = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM asistencias");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getAsistencia = async (req, res) => {
  try {
    const { jugador_id, reunion_id } = req.params;
    const [rows] = await pool.query("SELECT * FROM asistencias WHERE jugador_id = ? AND reunion_id = ?", [jugador_id, reunion_id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Asistencia no registrada!" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getAsistenciasDeJugador = async (req, res) => {
  try {
    const { jugador_id } = req.params;
    const [rows] = await pool.query("SELECT * FROM asistencias WHERE jugador_id = ? ORDER BY reunion_id", [jugador_id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Asistencia no registrada!" });
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};



const deleteAsistencia = async (req, res) => {
  try {
    const { jugador_id, reunion_id } = req.params;
    const [rows] = await pool.query("DELETE FROM asistencias WHERE jugador_id = ? AND reunion_id = ?", [jugador_id, reunion_id]);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Asistencia no encontrada!" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const createAsistencia = async (req, res) => {
  try {
    let asistencias = req.body;
    console.log(asistencias);
    if (!Array.isArray(asistencias)) {
      asistencias = [asistencias]
    }
    // Validar que haya datos válidos
    if (asistencias.length === 0) {
      return res.status(400).json({ message: "El cuerpo de la solicitud no contiene datos válidos." });
    }
    const values = asistencias.map(({ jugador_id, reunion_id }) => [jugador_id, reunion_id]);
    const [rows] = await pool.query(
      "INSERT INTO asistencias (jugador_id, reunion_id) VALUES ?", [values]);
    res.status(201).json({
      info: rows,
      data: asistencias,
      message: "Asistencias creadas exitosamente.",
    });
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

module.exports = {
  getAsistencia,
  getAsistencias,
  getAsistenciasDeJugador,
  createAsistencia,
  deleteAsistencia
}

