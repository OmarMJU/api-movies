const express = require("express");
const MoviesService = require("../service/movies");

function moviesAPI (app) {
    const router = express.Router();
    const moviesService = new MoviesService();

    app.use("/api/movies", router);

    // Cuando se consulta la URL "/"" regresa TODAS las peliculas.
    router.get("/", async function (req, res, next) {
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });
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
        const { movieId } = req.param;

        try {
            console.log("Desde el router", {movieId});

            const movie = await moviesService.getMovie({ movieId });
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
        const { body: movie } = req;

        try {
            const createMovie = await moviesService.createMovie({ movie });
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
        const { body: movie } = req;
        const { movieId } = req.param;

        try {
            const updateMovie = await moviesService.updateMovie({ movieId, movie });
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
        const { movieId } = req.param;

        try {
            const deleteMovie = await moviesService.deleteMovie({ movieId });
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