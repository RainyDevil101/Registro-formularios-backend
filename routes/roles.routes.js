const { Router } = require('express');
const { check } = require('express-validator');
const {getRoles} = require('../controllers/roles.controllers')
const { validateJWT, hasRole } = require('../middlewares');
const router = Router();
// Get all positions - ADMIN
router.get('/', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
], getRoles);
module.exports = router;