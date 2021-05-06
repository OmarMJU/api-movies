const express = require("express");
const app = express();
const { config } = require("./config/index");
const moviesAPI = require("./routers/movies.js");
const _PORT = config.port;
const { logErrors, wrapError, errorHandler } = require("./utils/middleware/errorHandlers.js");
const notFoundHandler = require("./utils/middleware/notFoundHandler.js");

// Body Parser.
app.use(express.json());

// routes
moviesAPI(app);

// Catch 404
app.use(notFoundHandler);

// Manejadores de errores - Errors Middleware.
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(_PORT, () => console.log(`El server esta corriendo en http://localhost${_PORT}`));