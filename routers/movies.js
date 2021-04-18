const express = require("express");
const { moviesMock } = require("../utils/mocks/movies");

function moviesAPI (app) {
    const router = express.Router();
    app.use("/api/movies", router);

    // Cuando se consulta la URL "/"" regresa TODAS las peliculas.
    router.get("/", async function (req, res, next) {
        try {
            const movies = await Promise.resolve(moviesMock);
            res.status(200).json({
                data: movies,
                message: "Movies listed"
            });
        } catch (error) {
            next(error);
        }
    });

    // Cuando se consulta la URL "/:movieId" se consulta una película específica.
    router.get("/:movieId", async function (req, res, next) {
        try {
            const movie = await Promise.resolve(moviesMock[0]);
            res.status(200).json({
                data: movie,
                message: "Movie retrived"
            });
        } catch (error) {
            next(error);
        }
    });

    // Método implementado para crear una pelícuila.
    router.post("/", async function (req, res, next) {
        try {
            const createMovie = await Promise.resolve(moviesMock[0].id);
            res.status(201).json({
                data: createMovie,
                message: "movie created"
            });
        } catch (error) {
            next(error);
        }
    });

    // Método para actualizar una película.
    router.put("/:movieId", async function (req, res, next) {
        try {
            const updateMovie = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data: updateMovie,
                message: "Movie update"
            });
        } catch (error) {
            next(error);
        }
    });

    // Método para borrar una película.
    router.delete("/:movieId", async function (req, res, next) {
        try {
            const deleteMovie = await Promise.resolve(moviesMock[0].id);
            res.status(200).json({
                data: deleteMovie,
                message: "movie deleted"
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports  = moviesAPI;