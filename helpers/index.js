const dbValidators  = require('./db-validators');
const generateJWT   = require('./generate-jwt');
const uploadFile    = require('./upload-file');
const validateRut   = require('./run-validator');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...uploadFile,
    ...validateRut,
}