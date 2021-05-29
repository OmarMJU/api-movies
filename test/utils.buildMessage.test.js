const assert = require("assert");
const buildMessage = require("../utils/buildMessage");

describe("utils - buildMessage", function() {
    describe("wheb recives an entity and an action", function() {
        it("should return the respective message", function() {
            const result = buildMessage("movie", "create");
            const expected = "movie created";
            assert.strictEqual(result, expected);
        });
    });

    describe("recives an entity and action is list", function() {
        it("it should returns the respective message with entity is a list", function() {
            const result = buildMessage("movie", "list");
            const expected = "movies listed";
            assert.strictEqual(result, expected);
        });
    });
});