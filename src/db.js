import { createPool } from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, sslConfig } from "./config.js";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
  timezone: 'local',
  ...sslConfig
<<<<<<< HEAD
}); 
=======
});
>>>>>>> 25780a294cd268aa0441f81766ff468bbaee399f
