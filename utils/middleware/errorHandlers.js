const { config } = require("../../config/index");

function withErrorStack (error, stack) {
    if (config.dev) {
        return { error, stack };
    }

    return error;
}

function logErrors (error, request, response, next) {
    console.error(error);
    next(error);
}

function errorHandler (error, requiest, response, next) { // eslint-disable-line
    response.status(error.status || 500);
    response.json(withErrorStack(error.message, error.stack));
}

module.exports = { logErrors, errorHandler };