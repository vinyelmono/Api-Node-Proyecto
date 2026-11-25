const express = require('express');
const router = express.Router();


const usuarioControlador = require('../Controlador/ControladorUsuario');

router.get('/', usuarioControlador.obtenerUsuarios);
router.get('/:id', usuarioControlador.obtenerUsuarioPorId);
router.post('/', usuarioControlador.CrearUsuario);
router.put('/:id', usuarioControlador.actualizar);
router.delete('/:id', usuarioControlador.eliminar);
module.exports = router;