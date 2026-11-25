const express = require('express');
const router = express.Router();

const categoriasControlador = require('../Controlador/categoriaControlador');

router.get('/', categoriasControlador.obtenerCategorias);
router.get('/:id', categoriasControlador.obtenerCategoriaPorID);
router.post('/', categoriasControlador.crearCategoria);
router.put('/:id', categoriasControlador.actualizarCategoria);
router.delete('/:id', categoriasControlador.eliminarCategoria);

module.exports = router;
