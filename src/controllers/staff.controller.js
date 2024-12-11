const pool = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Import the nodemailer library for email sending functionality.


const getStaffs = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nombre, cargo, direccion, telefono, talla, email, username FROM staff");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const getStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT id, nombre, cargo, direccion, telefono, talla, email, username FROM staff WHERE id = ?", [
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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar que los campos no estén vacíos
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y contraseña son requeridos.' });
    }

    // Buscar al usuario en la base de datos
    const [rows] = await pool.query('SELECT * FROM staff WHERE username = ?', [username]);

    // Verificar si el usuario existe
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const user = rows[0];

    // Comparar contraseñas (hash vs texto plano)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'default_secret', // Usa una variable de entorno para la clave secreta
      { expiresIn: '1h' } // Token válido por 1 hora
    );

    // Enviar respuesta
    res.status(200).json({
      message: '👍 Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        cargo: user.cargo,
        username: user.username,
        email: user.email
        // Otros campos que quieras enviar
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo salió mal :(', error });
  }
};

const resetPassword = async (req, res) => {

  // Create a reusable transporter object using SMTP transport.
  const transporterGoogle = nodemailer.createTransport({
    host: process.env.SMTP_GOOGLE_HOST,
    port: process.env.SMTP_GOOGLE_PORT,
    //secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.SMTP_GOOGLE_USER,
      pass: process.env.SMTP_GOOGLE_PASS
    }
  });
  try {
    console.log('Recibiendo datos....');
    const { name, subject, email, txt_message, html_message } = req.body; // Destructure and retrieve data from request body.

    console.log('Validando datos...');
    // Validate required fields.
    if (!name || !subject || !email || !txt_message) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields', data: req.body });
    }

    console.log('Datos... ok 👍');
    console.log('Preparando email... 📫 ');
    // Prepare the email message options.
    const mailOptions = {
      from: process.env.SMTP_GOOGLE_USER, // Sender address from environment variables.
      to: `${name} <${email}>`, // Recipient's name and email address.
      //replyTo: process.env.REPLY_TO, // Sets the email address for recipient responses.
      subject: subject, // Subject line.
      text: txt_message, // Plaintext body.
      html: html_message
    };

    console.log('📬 Enviando email....');
    // Send email and log the response.
    const info = await transporterGoogle.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ status: 'success', message: 'Email sent successfully' });
  } catch (err) {
    // Handle errors and log them.
    console.error('Error sending email:', err);
    res.status(500).json({ status: 'error', message: 'Error sending email, please try again.' });
  }

}

const createStaff = async (req, res) => {
  try {
    const { nombre, cargo, direccion, telefono, talla, email, username, password } = req.body;

    if (!nombre || !username || !password || !email) {
      return res.status(400).json({ message: 'Nombre, email, username y contraseña son requeridos.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const [row] = await pool.query(
      "INSERT INTO staff ( nombre, cargo, direccion, telefono, talla, email, username, password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, cargo, direccion, telefono, talla, email, username, hashedPassword]
    );
    //res.status(201).json({ nombre, cargo, direccion, telefono, talla });
    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      user: {
        id: row.id,
        nombre: row.nombre,
        cargo: row.cargo,
        direccion: row.direccion,
        telefono: row.telefono,
        talla: row.tallan,
        email: row.email,
        username: row.username
      }
    })
  } catch (error) {
    return res.status(500).json({ error: error, message: "Algo salió mal :(" });
  }
};

const updateStaff = async (req, res) => {
  try {
    // el email, username y password NO SE PUEDEN EDITAR, en todo caso se borra y se crea otro nuevo
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
  login,
  resetPassword,
  updateStaff
}