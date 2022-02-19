const { Router } = require('express');
const { check } = require('express-validator');
const { createQuestion,
    getQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion } = require('../controllers/question.controllers')
const { validateJWT, validateFields, adminRole } = require('../middlewares');
const { questionByIdExists, questionNameExists } = require('../helpers')
const router = Router();

// Get all questions - ADMIN
router.get('/', [
    validateJWT,
    adminRole
], getQuestions);

// Get question by id - ADMIN
router.get('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(questionByIdExists),
    validateFields,
], getQuestion);

// Create a new question - ADMIN
router.post('/', [
    validateJWT,
    adminRole,
    validateFields,
], createQuestion)

//Update forum - ADMIN
router.put('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(questionByIdExists),
    validateFields,
], updateQuestion)

//Delete forum - ADMIN
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(questionByIdExists),
    validateFields
], deleteQuestion);
module.exports = router;