const { Router } = require('express');
const { check }  = require('express-validator');

const { validateFields, validateFileUpload } = require('../middlewares');
const { uploadFileCon, updateImage } = require('../controllers/uploads.controllers');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post( '/', validateFileUpload, uploadFileCon );

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['forum'] ) ),
    validateFields
], updateImage)

module.exports = router;