const { Router } = require('express');
const { check } = require('express-validator');
const {getRoles,} = require('../controllers/roles.controllers')
const { validateJWT, adminRole } = require('../middlewares');
const router = Router();
// Get all positions - ADMIN
router.get('/', [
    validateJWT,
    adminRole
], getRoles);
module.exports = router;