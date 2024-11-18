import { pool } from "../db.js";

export const getBitacoras = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bitacora");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const getBitacora = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM bitacora WHERE id = ?", [id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Bitacora no encontrado!" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const getBitacorasCompletadas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bitacora WHERE completada=1");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};
export const getBitacorasPendientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bitacora WHERE completada=0");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};


export const getBitacorasTareaCompletadas = async (req, res) => {
  const { tarea } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM bitacora WHERE tarea_id=? AND completada=1", [tarea]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "No hay registros." });
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};
export const getBitacorasTareaPendientes = async (req, res) => {
  const { tarea_id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM bitacora WHERE tarea_id=? AND completada=0", [tarea_id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "No hay registros." });
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const getHistorialJugador = async (req, res) => {
  const { jugador_id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM bitacora WHERE jugador_id=?", [jugador_id]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "No hay registros." });
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const deleteBitacora = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM bitacora WHERE id = ?", [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Bitacora no encontrado!" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error?.message || error, message: "Algo salió mal :(" });
  }
};

export const createBitacora = async (req, res) => {
  try {
    const { tarea_id, jugador_id, recibido, completada, comentario } = req.body;
    //const fecha = formatDate(new Date());
    const [rows] = await pool.query(
      "INSERT INTO bitacora (tarea_id, jugador_id, recibido, completada, comentario) VALUES (?, ?, ?, ?, ?)",
      [tarea_id, jugador_id, recibido, completada, comentario]
    );
    //res.status(201).json({ tarea_id, jugador_id, recibido, fecha, completada, comentario });
    res.status(201).json({ info: rows, data: req.body })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

export const updateBitacora = async (req, res) => {
  try {
    const { id } = req.params;
    const { tarea_id, jugador_id, recibido, fecha, completada, comentario } = req.body;
    const [result] = await pool.query(
      "UPDATE bitacora SET tarea_id = IFNULL(?, tarea_id), jugador_id = IFNULL(?, jugador_id), recibido = IFNULL(?, recibido), fecha = IFNULL(?, fecha), completada = IFNULL(?, completada), comentario = IFNULL(?, comentario) WHERE id = ?",
      [tarea_id, jugador_id, recibido, fecha, completada, comentario, id]
    );
    //console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Bitacora no encontrado!" });
    const [rows] = await pool.query("SELECT * FROM bitacora WHERE id = ?", [id]);
    //console.log(rows);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};
