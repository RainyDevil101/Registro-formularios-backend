const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT, adminRole } = require('../middlewares');
const {  mExists, userByIdExists, validRole, storageByIdExists } = require('../helpers/db-validators');
const { usersGet, usersDelete, usersPost, getUser, usersPut } = require('../controllers/user.controllers');
const router = Router();
//Get users ADMIN
router.get('/', [
    validateJWT,
    adminRole,
] , usersGet) ;

// Get user by id ADMIN
router.get('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un id válido.').isMongoId(),
    check('id').custom(userByIdExists),
    validateFields,
], getUser);

// Create user ADMIN
router.post('/', [
    // validateJWT,
    // adminRole,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras.').isLength({ min: 6 }),
    check('mail').custom( mExists ).isEmail(),
    check('role').custom( validRole ),
    validateFields
] , usersPost) ;

//Update user ADMIN
router.put('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( userByIdExists ),
    check('storage').custom( storageByIdExists ),
    validateFields
] , usersPut);

//Delete user ADMIN
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom( userByIdExists ),
    validateFields
] , usersDelete);
module.exports = router;