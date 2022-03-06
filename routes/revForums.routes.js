const { Router } = require('express');
const { check } = require('express-validator');
const { createRevForum,
    getRevForum,
    getRevForums,
    updateRevForum,
    deleteRevForum } = require('../controllers/revForum.controllers')
const { validateJWT, validateFields, adminRole, hasRole } = require('../middlewares');
const { revForumByIdExists, revForumNameExists } = require('../helpers')
const router = Router();

// Get all revforums - ADMIN
router.get('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
], getRevForums);

// Get revforum by id - ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(revForumByIdExists),
    validateFields,
], getRevForum);

// Create a new revforum - ADMIN
router.post('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
    validateFields,
], createRevForum)

//Update revforum - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'CONSULTOR_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(revForumByIdExists),
    validateFields,
], updateRevForum)

//Delete revforum - ADMIN
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(revForumByIdExists),
    validateFields
], deleteRevForum);
module.exports = router;