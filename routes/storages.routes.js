const { Router } = require('express');
const { check } = require('express-validator');
const { createStorage,
    getStorage,
    getStorages,
    updateStorage,
    deleteStorage } = require('../controllers/storage.controllers')
const { validateJWT, validateRoles, validate, validateFields, adminRole, hasRole } = require('../middlewares');
const { storageByIdExists, storageNameExists } = require('../helpers')
const router = Router();
// Get all storages - ADMIN
router.get('/', [
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE'),
], getStorages);
// Get storage by id - ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(storageByIdExists),
    validateFields,
], getStorage);
// Create a new storage - ADMIN
router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre no es válido').isLength({ min: 1 }).matches(/^[a-zA-Z0-9_.-]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], createStorage)
//Update storage - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(storageByIdExists),
    check('name').custom(storageNameExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre no es válido').isLength({ min: 1 }).matches(/^[a-zA-Z0-9_.-]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], updateStorage)
//Delete storage - ADMIN
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(storageByIdExists),
    validateFields
], deleteStorage);
module.exports = router;