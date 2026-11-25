const express = require('express');
const router = express.Router();

const clientesControlador = require('../Controlador/clienteControlador');

router.get('/', clientesControlador.obtenerClientes);
router.get('/:id', clientesControlador.obtenerClientePorID);
router.post('/', clientesControlador.crearCliente);
router.put('/:id', clientesControlador.actualizarCliente);
router.delete('/:id', clientesControlador.eliminarCliente);

module.exports = router;
