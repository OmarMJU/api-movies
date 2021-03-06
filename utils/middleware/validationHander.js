const boom = require("@hapi/boom");
const joi = require("@hapi/joi");
const optionsError = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
};

function validate(data, schema) {
    const { error } = joi.object(schema).validate(data, optionsError);
    // const { error } = schema.validate(data, { errors: { stack: true } });
    return error;
}

function validationHandler(schema, check = "body") {
    return function (req, res, next) {
        const error = validate(req[check], schema);
        error ? next(boom.badRequest(error)) : next();
    } 
}

module.exports = validationHandler;