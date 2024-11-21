const pool = require('../db.js');

/*
http://ruta/api/  ->  index()
*/
const index = (req, res) => res.json({ message: "Bienvenido a mi api" });

/*
http://ruta/api/ping
*/
const ping = async (req, res) => {
  const [result] = await pool.query("SELECT 'PONG' as result");
  res.json(result[0].result);
};

module.exports = {
  index,
  ping
}