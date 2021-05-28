const assert = require("assert");
const proxyquire = require("proxyquire");
const { getAllStub, MongoLibMock } = require("../utils/mocks/mongoLib");
// const { moviesMock } = require("../utils/mocks/movies");

describe("services - movies", function() {
    const MoviesServices = proxyquire("../service/movies", {
        "../lib/mongodb": MongoLibMock
    });

    const moviesServices = new MoviesServices();

    describe("when movies method is called", async function() {
        it("should call the getall MongoLib  method", async function() {
            await moviesServices.getMovies({});
            assert.strictEqual(getAllStub.called, true);
        });
    });
});