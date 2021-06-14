const express = require("express");
const MoviesService = require("../service/movies");
const cacheResponse = require("../utils/cacheResponse");
const validationHandler = require("../utils/middleware/validationHander");
const { FIVE_MINUTES_IN_SEC, SIXTY_MINUTES_IN_SEC } = require("../utils/time");
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require("../utils/schemas/movies");

function moviesAPI (app) {
    const router = express.Router();
    const moviesService = new MoviesService();

    app.use("/api/movies", router);

    // Cuando se consulta la URL "/"" regresa TODAS las peliculas.
    router.get("/", async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SEC);
        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });
            // throw new Error("Controled error to getting movies!!");
            res.status(200).json({
                data: movies,
                message: "Movies listed"
            });
        } catch (error) {
            next(error);
        }
    });

    // Cuando se consulta la URL "/:movieId" se consulta una película específica.
    router.get("/:movieId", validationHandler({ movieId: movieIdSchema}, "params"), async function (req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SEC);
        const { movieId } = req.params;

        try {
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
    router.post("/", validationHandler(createMovieSchema), async function (req, res, next) {
        const { body: movie } = req;

        try {
            const createMovie = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createMovie,
                message: "Movie created"
            });
        } catch (error) {
            next(error);
        }
    });

    // Método para actualizar una película.
    router.put("/:movieId", validationHandler({ movieId: movieIdSchema}, "params"), validationHandler(updateMovieSchema), async function (req, res, next) {
        const { body: movie } = req;
        const { movieId } = req.params;

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
    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema}, "params"), async function (req, res, next) {
        const { movieId } = req.params;

        try {
            const deleteMovie = await moviesService.deleteMovie({ movieId });
            res.status(200).json({
                data: deleteMovie,
                message: "Movie deleted"
            });
        } catch (error) {
            next(error);
        }
    });
}

module.exports  = moviesAPI;