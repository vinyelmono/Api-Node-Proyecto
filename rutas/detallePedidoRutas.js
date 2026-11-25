const express = require('express');
const router = express.Router();

const detallePedidoControlador = require('../Controlador/detallePedidoControlador');

// Rutas fijas ANTES de /:id para que no las capture
router.get('/pedido/:idPedido', detallePedidoControlador.obtenerDetalleDePedido);
router.get('/resumen/productos', detallePedidoControlador.resumenPorProducto);
router.get('/resumen/categorias', detallePedidoControlador.resumenPorCategoria);

router.get('/', detallePedidoControlador.obtenerDetalles);
router.get('/:id', detallePedidoControlador.obtenerDetallePorID);
router.post('/', detallePedidoControlador.crearDetalle);
router.put('/:id', detallePedidoControlador.actualizarDetalle);
router.delete('/:id', detallePedidoControlador.eliminarDetalle);

module.exports = router;
