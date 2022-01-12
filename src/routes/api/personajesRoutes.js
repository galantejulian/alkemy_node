const express = require('express');
const router = express.Router();
const personajesAPIController = require('../../controllers/api/personajesAPIController');
const jwt = require('../../middleware/JWT')

// listado de todos los personajes
router.get('/', personajesAPIController.listado);
// crear
router.post("/create", personajesAPIController.crear);
// modificar
router.put('/update/:id', personajesAPIController.editar);
// eliminar
router.delete('/delete/:id', personajesAPIController.borrar);
// detalle
router.get('/detail/:id', personajesAPIController.detalle);
// buscar
router.get('/:name?/:age?/:movies?', personajesAPIController.buscar);


module.exports = router;