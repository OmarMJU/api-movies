const express = require("express");
const app = express();
const { config } = require("./config/index");
const _PORT = config.port

app.get("/", (req, res) => {
    res.send("El server funciona con madre 😎");
});

app.get("/json", (req, res) => {
    res.json({ server: "corriendo", estatus: "con madre" });
});

app.listen(_PORT, () => console.log(`El server esta corriendo en http://localhost${_PORT}`));