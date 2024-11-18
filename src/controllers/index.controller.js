import { pool } from "../db.js";

/*
http://ruta/api/index  ->  index()
*/
export const index = (req, res) => res.json({ message: "Bienvenido a mi api" });

/*
http://rut/api/ping
*/
export const ping = async (req, res) => {
  const [result] = await pool.query("SELECT 'PONG' as result");
  res.json(result[0].result);
};
