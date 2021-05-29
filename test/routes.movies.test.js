const assert = require("assert");
const proxyquire = require("proxyquire");
// const { requests } = require("sinon");
const { moviesMock, MoviesServiceMock } = require("../utils/mocks/movies.js");
const testServer = require("../utils/testServer");

describe("routes - movies", function () {
    const route = proxyquire("../routers/movies.js", {
        "../service/movies": MoviesServiceMock
    });

    // Crea un servidor para Test, no es un servidor real.
    const request = testServer(route);

    // Se crean TEST para las rutas con el método GET.
    describe("GET/movies",  function() {
        it("Hace el test solo para la respuesta del servidor", function(done) {
            request.get("/api/movies").expect(200, done);
        });

        it("Se hace el test para la consulta de todas las peliculas", function(done) {
            request.get("/api/movies/").end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: "Movies listed"
                });

                done();
            });
        });
        
        it("Se hace el test para la consulta de de una sola pelicula", function(done) {
            const movieIdMock = "6083b0b2b43c030713177575";

            request.get(`/api/movies/${movieIdMock}`).end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock[0],
                    message: "Movie retrived"
                });

                done();
            });
        });
    });

    // Se crean TEST para la rutas con el método POST.
    describe("POST/movies", function() {
        it("Se realiza test para respuesta a POST /", function(done) {
            request.post("/api/movies").expect(201, done);
        });

        it("Se realiza test para respuesta a POST con body", function(done) {
            request.post("/api/movies").send(moviesMock[0]).end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock[0].id,
                    message: "Movie created"
                });

                done();
            });
        });
    });
});