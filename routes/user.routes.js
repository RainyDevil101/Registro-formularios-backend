const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT, hasRole } = require('../middlewares');
const {  mExists, userByIdExists, validRole, storageByIdExists } = require('../helpers/db-validators');
const { usersGet, usersDelete, usersPost, getUser, usersPut } = require('../controllers/user.controllers');
const { rutValidated } = require('../helpers/run-validator')
const router = Router();
//Get users ADMIN
router.get('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
] , usersGet) ;

// Get user by id ADMIN
router.get('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields,
], getUser);

// Create user ADMIN
router.post('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras.').isLength({ min: 6 }),
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('rut').custom( rutValidated ),
    check('mail').custom( mExists ).isEmail(),
    check('role').custom( validRole ),
    validateFields
] , usersPost) ;

//Update user ADMIN
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( userByIdExists ),
    check('rut', 'El rut es obligatorio.').not().isEmpty(),
    check('rut').custom( rutValidated ),
    validateFields
] , usersPut);

//Delete user ADMIN
router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( userByIdExists ),
    validateFields
] , usersDelete);
module.exports = router;