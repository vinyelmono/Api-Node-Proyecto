const express = require('express');
const router = express.Router();

const productosControlador = require('../Controlador/productoControlador');

// La ruta fija va ANTES de /:id para que no la capture
router.get('/con-categoria', productosControlador.obtenerProductosConCategoria);

router.get('/', productosControlador.obtenerProductos);
router.get('/:id', productosControlador.obtenerProductoPorID);
router.post('/', productosControlador.crearProducto);
router.put('/:id', productosControlador.actualizarProducto);
router.delete('/:id', productosControlador.eliminarProducto);

module.exports = router;
