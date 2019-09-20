import Joi from '@hapi/joi';

/**
* @param {Object} data
* @param {Object} schema
* @param {Function} next
* @returns {Function}
*/
const joiValidator = (data, schema) => {
    let message;
    const validationOptions = {
        allowUnknown: false, // allow unknown keys that will be ignored
        stripUnknown: true, // remove unknown keys from the validated data
    };
    Joi.validate(data, schema, validationOptions, (err) => {
        if (err) {
            message = err.details.map(i => i.message.replace(/['"]/g, ''));
        }
    });
    return message;
};

export default joiValidator;
