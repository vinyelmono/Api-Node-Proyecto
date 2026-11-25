const express = require('express');
const router = express.Router();
const empleadoControlador = require('../Controlador/empleadoControlador');

router.get('/', empleadoControlador.obtenerEmpleados);
router.get('/:id', empleadoControlador.obtenerEmpleadosPorId);
router.post('/', empleadoControlador.CrearEmpleado);
router.put('/:id', empleadoControlador.ActualizarEmpleado);
router.delete('/:id', empleadoControlador.EliminarEmpleado);

module.exports = router;
