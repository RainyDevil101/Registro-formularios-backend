const { Router } = require('express');
const { check } = require('express-validator');
const { createUbication,
        getUbication,
        getUbications,
        updateUbication,
        deleteUbication } = require('../controllers/ubication.controllers')
const { validateJWT, validateFields, hasRole, adminRole } = require('../middlewares');
const { ubicationByIdExists, ubicationNameExists } = require('../helpers')
const router = Router();

// Get all ubications - public
router.get('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE'),
] , getUbications);

// Get category by id
router.get('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(ubicationByIdExists),
    validateFields,
], getUbication);

// Create a new ubication - ADMIN
router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre no es válido').isLength({ min: 1 }).matches(/^[a-zA-Z0-9_.-]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
],createUbication)

//Update ubication - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( ubicationByIdExists ),
    check('name').custom(ubicationNameExists),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre no es válido.').isLength({ min: 1 }).matches(/^[a-zA-Z0-9_.-]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], updateUbication)

//Delete ubication - ADMIN
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom( ubicationByIdExists  ),
    validateFields
] , deleteUbication );
module.exports = router;