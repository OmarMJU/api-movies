const assert = require("assert");
const proxyquire = require("proxyquire");
const testServer = require("../utils/testServer");
const { moviesMock, MoviesServiceMock } = require("../utils/mocks/movies.js");

const _PATH = "/api/movies";
const movieIdMock = "6083b0b2b43c030713177575";

// -- COMIENZAN TEST PARA LAS RUTAS --
describe("routes - movies", function () {
    const route = proxyquire("../routers/movies.js", {
        "../service/movies": MoviesServiceMock
    });

    // Crea un servidor para Test, no es un servidor real.
    const request = testServer(route);

    // Se crean TEST para las rutas con el método GET.
    describe("GET/movies",  function() {
        it("Hace el test solo para la respuesta del servidor", function(done) {
            request.get(_PATH).expect(200, done);
        });

        it("Se hace el test para la consulta de todas las peliculas", function(done) {
            request.get(`${_PATH}/`).end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: "Movies listed"
                });

                done();
            });
        });
        
        it("Se hace el test para la consulta de de una sola pelicula", function(done) {
            request.get(`${_PATH}/${movieIdMock}`).end((err, res) => {
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
            request.post(_PATH).expect(201, done);
        });

        it("Se realiza test para respuesta a POST con body", function(done) {
            request.post(_PATH).send(moviesMock[0]).end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock[0].id,
                    message: "Movie created"
                });

                done();
            });
        });
    });

    // Se crean TEST para método PUT.
    describe("PUT/movies", function() {
        it("Respuesta del server para el metodo PUT", function(donde) {
            request.put(`${_PATH}/${movieIdMock}`).expect(200, donde);
        });

        it("Respuesta del servidor con el metodo PUT con body", function(done) {
            request.put(`${_PATH}/${movieIdMock}`).send(moviesMock[0].id, moviesMock[0]).end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock[0].id,
                    message: "Movie update"
                });

                done();
            });
        });
    });

    // Se crean TEST para el método DELETE.
    describe("DELETE/movies", function() {
        it("Para resupesta del server del metodo DELETE", function(done) {
            request.delete(`${_PATH}/${movieIdMock}`).expect(200, done);
        });

        it("TEST para borrar pelicula", function(done) {
            request.delete(`${_PATH}/${movieIdMock}`).send(moviesMock[0].id).end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock[0].id,
                    message: "Movie deleted"
                });

                done();
            });
        });    
    });
});