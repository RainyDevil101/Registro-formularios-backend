const { Router } = require('express');
const { check } = require('express-validator');
const { createQuestion,
    getQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion } = require('../controllers/question.controllers')
const { validateJWT, validateFields, adminRole, hasRole } = require('../middlewares');
const { questionByIdExists, questionNameExists } = require('../helpers')
const router = Router();

// Get all questions - ADMIN
router.get('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE'),
], getQuestions);

// Get question by id - ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(questionByIdExists),
    validateFields,
], getQuestion);

// Create a new question - ADMIN
router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    validateFields,
], createQuestion)

//Update question - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(questionByIdExists),
    validateFields,
], updateQuestion)

//Delete question - ADMIN
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(questionByIdExists),
    validateFields
], deleteQuestion);
module.exports = router;