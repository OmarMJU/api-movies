const boom = require("@hapi/boom");
const { config } = require("../../config/index");

function withErrorStack (error, stack) {
    if (config.dev) {
        return { ...error, stack };
    }

    return error;
}

function logErrors (error, request, response, next) {
    console.error(error);
    next(error);
}

function wrapError (err, req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

function errorHandler (error, requiest, response, next) { // eslint-disable-line
    const { output: { statusCodee, payload } } = error;
    response.status(statusCodee);
    response.json(withErrorStack(payload, error.stack));
}

module.exports = { logErrors, wrapError, errorHandler };