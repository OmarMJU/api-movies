const { moviesMock } = require("../utils/mocks/movies");

class MoviesService {
    // Para consultar todas las películas.
    async getMovies() {
        const movies = await Promise.resolve(moviesMock);
        return movies;
    }

    // Para consiltar una película.
    async getMovie() {
        const movie = await Promise.resolve(moviesMock[0]);
        return movie;
    }

    // Para crear una película.
    async createMovie() {
        const createMovieId = await Promise.resolve(moviesMock[0].id);
        return createMovieId;
    }

    // Para actualizar una película.
    async updateMovie() {
        const updateMovieId = await Promise.resolve(moviesMock[0].id);
        return updateMovieId;
    }

    // Para mover una película.
    async deleteMovie() {
        const deleteMovieId = await Promise.resolve(moviesMock[0].id);
        return deleteMovieId;
    }

    // Para actualizar una pelicula de forma parcial.
    async updatePatchMovie() {
        const updatePartialMovie = await Promise.resolve(moviesMock[0].id);
        return updatePartialMovie;
    }
}

module.exports = MoviesService;