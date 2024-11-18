import app from "./app.js";
import { PORT, HOST, DB_USER, DB_HOST } from "./config.js";

app.listen(PORT);
console.log(`Server on port ${HOST}:${PORT}`);
console.log(`BD connection ${DB_USER} @ ${DB_HOST}`);
