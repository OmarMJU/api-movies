const sinon = require("sinon");
const { moviesMock, filteredMovieMock } = require("./movies");

const getAllStub = sinon.stub();
const getOneStub = sinon.stub();
const tagQuery = { tags: { $in: ["Drama"] } };
const createSub = sinon.stub().resolves(moviesMock[0].id);

getAllStub.withArgs("movies").resolves(moviesMock);
getAllStub.withArgs("movies", tagQuery).resolves(filteredMovieMock("Drama"));
getOneStub.withArgs("movies").resolves(moviesMock[0]);

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }

    create(collection, data) {
        return createSub(collection, data);
    }

    get(collection, id) {
        return getOneStub(collection, id);
    }

    update(collection, id) {
        return createSub(collection, id);
    }

    delete(collection, id) {
        return createSub(collection, id);
    }
}

module.exports = {
    getAllStub,
    getOneStub,
    createSub,
    MongoLibMock
};