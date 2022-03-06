const { Router } = require('express');
const { check } = require('express-validator');
const { createForum,
    getForum,
    getForums,
    updateForum,
    deleteForum } = require('../controllers/forum.controllers')
const { validateJWT, validateFields, adminRole, hasRole } = require('../middlewares');
const { forumByIdExists, forumNameExists } = require('../helpers')
const router = Router();

// Get all forums - ADMIN
router.get('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE'),
], getForums);

// Get forum by id - ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(forumByIdExists),
    validateFields,
], getForum);

// Create a new forum - ADMIN
router.post('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE'),
    validateFields,
], createForum)

//Update forum - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(forumByIdExists),
    validateFields,
], updateForum)

//Delete forum - ADMIN
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(forumByIdExists),
    validateFields
], deleteForum);
module.exports = router;