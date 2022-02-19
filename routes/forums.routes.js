const { Router } = require('express');
const { check } = require('express-validator');
const { createForum,
    getForum,
    getForums,
    updateForum,
    deleteForum } = require('../controllers/forum.controllers')
const { validateJWT, validateFields, adminRole } = require('../middlewares');
const { forumByIdExists, forumNameExists } = require('../helpers')
const router = Router();

// Get all forums - ADMIN
router.get('/', [
    validateJWT,
    adminRole
], getForums);

// Get forum by id - ADMIN
router.get('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(forumByIdExists),
    validateFields,
], getForum);

// Create a new forum - ADMIN
router.post('/', [
    validateJWT,
    adminRole,
    validateFields,
], createForum)

//Update forum - ADMIN
router.put('/:id', [
    validateJWT,
    adminRole,
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