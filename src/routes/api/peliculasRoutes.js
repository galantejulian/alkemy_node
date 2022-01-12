const express = require('express');
const router = express.Router();
const peliculasAPIController = require('../../controllers/api/peliculasAPIController');


// listado de todos las peliculas
router.get('/', peliculasAPIController.listado);
// crear
router.post("/create", peliculasAPIController.crear);

module.exports = router