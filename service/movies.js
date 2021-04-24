const MongoLib = require("../lib/mongodb");

class MoviesService {
    constructor() {
        this.collection = "movies";
        this.mongoDB = new MongoLib();
    }

    // Para consultar todas las películas.
    async getMovies({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    // Para consiltar una película.
    async getMovie({ movieId }) {
        const movie = await this.mongoDB.get(this.collection, movieId);
        return movie;
    }

    // Para crear una película.
    async createMovie({ movie }) {
        const createMovieId = await this.mongoDB.create(this.collection, movie);
        return createMovieId;
    }

    // Para actualizar una película.
    async updateMovie({ movieId, movie } = {}) {
        const updateMovieId = await this.mongoDB.update(this.collection, movieId, movie);
        return updateMovieId;
    }

    // Para mover una película.
    async deleteMovie({ movieId }) {
        const deleteMovieId = await this.mongoDB.delete(this.collection, movieId);
        return deleteMovieId;
    }
}

module.exports = MoviesService;