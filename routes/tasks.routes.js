const { Router } = require('express');
const { check } = require('express-validator');
const { createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask } = require('../controllers/task.controllers')
const { validateJWT, validateFields, adminRole, hasRole } = require('../middlewares');
const { taskByIdExists, taskNameExists } = require('../helpers')
const router = Router();

// Get all tasks - ADMIN
router.get('/', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE')
], getTasks);

// Get task by id - ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('SUPERVISOR_ROLE', 'REVISOR_ROLE', 'ADMIN_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(taskByIdExists),
    validateFields,
], getTask);

// Create a new task - ADMIN
router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre no es válido.').isLength({ min: 1 }).matches(/^[a-zA-Z0-9 ]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], createTask)

//Update task - ADMIN
router.put('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(taskByIdExists),
    check('name').custom(taskNameExists),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('name', 'El nombre no es válido.').isLength({ min: 1 }).matches(/^[a-zA-Z0-9 ]*$/).withMessage('Solo puede contener letras y números'),
    validateFields,
], updateTask)

//Delete task - ADMIN
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    validateFields,
    check('id').custom(taskByIdExists),
    validateFields
], deleteTask);
module.exports = router;