const app = require("./app.js");
const { PORT, HOST, DB_USER, DB_HOST } = require("./config.js");

app.listen(PORT);
console.log(`Server on port ${HOST}:${PORT}`);
console.log(`BD connection ${DB_USER} @ ${DB_HOST}`);
