const validate = require('../middlewares/validate');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateFileUpload = require('../middlewares/validate-file');

module.exports = {
    ...validate,
    ...validateJWT,
    ...validateRoles,
    ...validateFileUpload,
}