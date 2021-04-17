const express = require("express");
const { moviesMock } = require("../utils/mocks/movies");

function moviesAPI (app) {
    const router = express.Router();
    app.use("/api/movies", router);

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
}

module.exports  = moviesAPI;