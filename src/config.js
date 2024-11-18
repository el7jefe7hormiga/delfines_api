import { config } from "dotenv";
import fs from 'fs';
//import { LOC_DB_NAME, LOC_DB_HOST, LOC_DB_USER, LOC_DB_PASSWORD } from "./env.js";
config();

console.log("NODE_ENV", process.env.NODE_ENV)

/* para la API */
export const PORT = process.env.PORT || 2553;
export const HOST = process.env.HOST || 'localhost';

/* para la BD */
export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = process.env.DB_PORT
//export const DB_SSL = process.env.DB_SSL
//export const DB_SSL_CA = process.env.DB_SSL_CA

// Configuración de SSL para la conexión a la base de datos, si es requerida
export const sslConfig = process.env.DB_SSL === 'true' ? {
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_SSL_CA ? fs.readFileSync(process.env.DB_SSL_CA).toString() : undefined,
    key: process.env.DB_SSL_KEY ? fs.readFileSync(process.env.DB_SSL_KEY) : undefined,
    cert: process.env.DB_SSL_CERT ? fs.readFileSync(process.env.DB_SSL_CERT) : undefined,
  }
} : {};

