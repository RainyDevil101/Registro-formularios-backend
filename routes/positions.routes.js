const { Router } = require('express');
const { check } = require('express-validator');
const { createPosition,
    getPosition,
    getPositions,
    updatePosition,
    deletePosition } = require('../controllers/position.controllers')
const { validateJWT, validateFields, adminRole, hasRole } = require('../middlewares');
const { positionByIdExists, positionNameExists } = require('../helpers')
const router = Router();

// Get all positions - ADMIN
router.get('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
], getPositions);

// Get position by id - ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(positionByIdExists),
    validateFields,
], getPosition);

// Create a new Position - ADMIN
router.post('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre no es válido.').isLength({ min: 1 }).matches(/^[a-zA-Z0-9 ]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], createPosition)

//Update position - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(positionByIdExists),
    check('name').custom(positionNameExists),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre no es válido.').isLength({ min: 1 }).matches(/^[a-zA-Z0-9_.-]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], updatePosition)

//Delete position - ADMIN
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(positionByIdExists),
    validateFields
], deletePosition);
module.exports = router;