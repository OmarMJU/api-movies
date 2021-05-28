const sinon = require("sinon");
const { moviesMock, filteredMovieMock } = require("./movies");

const getAllStub = sinon.stub();
const tagQuery = { tags: { $in: ["Drama"] } };
const createSub = sinon.stub().resolves(moviesMock[0].id);

getAllStub.withArgs("movies").resolves(moviesMock);
getAllStub.withArgs("movies", tagQuery).resolves(filteredMovieMock("Drama"));

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }

    create(collection, data) {
        return createSub(collection, data);
    }
}

module.exports = {
    getAllStub,
    createSub,
    MongoLibMock
};