const express = require('express');
const router = express.Router();

const pedidosControlador = require('../Controlador/pedidoControlador');

// La ruta fija va ANTES de /:id para que no la capture
router.get('/con-cliente', pedidosControlador.obtenerPedidosConCliente);

router.get('/', pedidosControlador.obtenerPedidos);
router.get('/:id', pedidosControlador.obtenerPedidoPorID);
router.post('/', pedidosControlador.crearPedido);
router.put('/:id', pedidosControlador.actualizarPedido);
router.delete('/:id', pedidosControlador.eliminarPedido);

module.exports = router;
