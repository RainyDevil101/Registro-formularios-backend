const { Router } = require('express');
const { check } = require('express-validator');
const { createForum,
    getForum,
    getForums,
    updateForum,
    deleteForum } = require('../controllers/forum.controllers')
const { validateJWT, validateFields, hasRole } = require('../middlewares');
const { forumByIdExists } = require('../helpers')
const router = Router();

// Get all forums - ADMIN
router.get('/', [
    validateJWT,
    hasRole('REVISOR_ROLE', 'ADMIN_ROLE'),
], getForums);

// Get forum by id - ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('REVISOR_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(forumByIdExists),
    validateFields,
], getForum);

// Create a new forum - ADMIN
router.post('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'ADMIN_ROLE'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name', 'El nombre no es válido').isLength({ min: 1, max: 40 }),
    validateFields,
], createForum)

//Update forum - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('REVISOR_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(forumByIdExists),
    validateFields,
], updateForum)

//Delete forum - ADMIN
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(forumByIdExists),
    validateFields
], deleteForum);
module.exports = router;