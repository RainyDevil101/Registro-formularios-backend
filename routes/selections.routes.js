const { Router } = require('express');
const { check } = require('express-validator');
const { createSelection,
    getSelection,
    getSelections,
    updateSelection,
    deleteSelection } = require('../controllers/selection.controllers')
const { validateJWT, validateFields, adminRole } = require('../middlewares');
const { optionByIdExists, optionNameExists } = require('../helpers')
const router = Router();

// Get all options - ADMIN
router.get('/', [
    validateJWT,
    // adminRole
], getSelections);

// Get option by id - ADMIN
router.get('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(optionByIdExists),
    validateFields,
], getSelection);

// Create a new option - ADMIN
router.post('/', [
    validateJWT,
    // adminRole,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre no es válido.').isLength({ min: 1 }).matches(/^[a-zA-Z0-9 ]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], createSelection)

//Update option - ADMIN
router.put('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(optionByIdExists),
    check('name').custom(optionNameExists),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre no es válido.').isLength({ min: 1 }).matches(/^[a-zA-Z0-9_.-]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], updateSelection)

//Delete option - ADMIN
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(optionByIdExists),
    validateFields
], deleteSelection);
module.exports = router;