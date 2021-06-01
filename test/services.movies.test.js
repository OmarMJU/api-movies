const assert = require("assert");
const proxyquire = require("proxyquire");
const { getAllStub, getOneStub, MongoLibMock } = require("../utils/mocks/mongoLib");
const { moviesMock } = require("../utils/mocks/movies");

describe("services - movies", function() {
    const MoviesServices = proxyquire("../service/movies", {
        "../lib/mongodb": MongoLibMock
    });

    const moviesServices = new MoviesServices();

    describe("when movies method is called", async function() {
        // TEST para el metodo getMovies().
        it("Test para el llamado metodo getMovies()", async function() {
            await moviesServices.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        });

        it("Test para verificar la respuesta del llamado del metdo getMovies()", async function() {
            const result = await moviesServices.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result, expected);
        });

        // TEST para el metodo getMovie().
        it("Test para el llamado del metodo getMovie()", async function() {
            await moviesServices.getMovie({});
            assert.strictEqual(getOneStub.called, true);
        });

        it("Test para verificar la respuesta del llamado al metodo getMovie()", async function() {
            const result = await moviesServices.getMovie({});
            const expected = moviesMock[0];
            assert.deepEqual(result, expected);
        });

        // TEST para el metodo createMovie().
        it("Test para el llamado del metdo createMovie()", async function() {
            await moviesServices.createMovie({});
            assert.strictEqual(getAllStub.called, true);
        });

        it("Test para verificar la respuesta del llamado del metodo createMovie()", async function() {
            const result = await moviesServices.createMovie({});
            const expected = moviesMock[0].id;
            assert.deepEqual(result, expected)
        });
    });
});