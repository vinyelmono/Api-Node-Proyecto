const express = require('express');
const router = require('./rutas/rutas');
const empleadosRutas = require('./rutas/empleadosRutas');
const categoriasRutas = require('./rutas/categoriasRutas');
const clientesRutas = require('./rutas/clientesRutas');
const pedidosRutas = require('./rutas/pedidosRutas');
const productosRutas = require('./rutas/productosRutas');
const detallePedidoRutas = require('./rutas/detallePedidoRutas');

const app = express();

app.use(express.json());

// Rutas específicas primero
app.use('/api/empleados', empleadosRutas);
app.use('/api/categorias', categoriasRutas);
app.use('/api/clientes', clientesRutas);
app.use('/api/pedidos', pedidosRutas);
app.use('/api/productos', productosRutas);
app.use('/api/detalle-pedido', detallePedidoRutas);

// Router genérico de usuarios al final (para que /:id no capture las rutas de arriba)
app.use('/api/', router);

module.exports = app;
