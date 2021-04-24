const express = require("express");
const app = express();
const { config } = require("./config/index");
const moviesAPI = require("./routers/movies.js");
const _PORT = config.port;

app.use(express.json());
moviesAPI(app);

app.listen(_PORT, () => console.log(`El server esta corriendo en http://localhost${_PORT}`));