const express = require('express');
const router = express.Router();
const usuariosAPIController = require('../../controllers/api/usuariosAPIController');

router.post('/login', usuariosAPIController.login)
router.post('/register', usuariosAPIController.register)

module.exports = router;