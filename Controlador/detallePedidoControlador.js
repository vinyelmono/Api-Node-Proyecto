const detallePedidoModelo = require('../modelos/modeloDetallePedido');

function faltan(...valores)
{
    return valores.some(v => v === undefined || v === null || v === '');
}

class detallePedidoControlador {

    static async obtenerDetalles(req, res)
    {
        try
        {
            const detalles = await detallePedidoModelo.obtenerTodo();
            return res.status(200).json({ exito: true, data: detalles });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener detalles' });
        }
    }

    static async obtenerDetallePorID(req, res)
    {
        try
        {
            const detalle = await detallePedidoModelo.obtenerPorID(req.params.id);
            if (!detalle)
                return res.status(404).json({ exito: false, mensaje: 'Detalle no encontrado' });

            return res.status(200).json({ exito: true, data: detalle });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener detalle' });
        }
    }

    static async obtenerDetalleDePedido(req, res)
    {
        try
        {
            const detalle = await detallePedidoModelo.obtenerPorPedido(req.params.idPedido);
            if (detalle.length === 0)
                return res.status(404).json({ exito: false, mensaje: 'El pedido no existe o no tiene productos' });

            return res.status(200).json({ exito: true, data: detalle });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener el detalle del pedido' });
        }
    }

    static async resumenPorProducto(req, res)
    {
        try
        {
            const resumen = await detallePedidoModelo.resumenPorProducto();
            return res.status(200).json({ exito: true, data: resumen });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener resumen por producto' });
        }
    }

    static async resumenPorCategoria(req, res)
    {
        try
        {
            const resumen = await detallePedidoModelo.resumenPorCategoria();
            return res.status(200).json({ exito: true, data: resumen });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener resumen por categoría' });
        }
    }

    static async crearDetalle(req, res)
    {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

        if (faltan(id_pedido, id_producto, cantidad, precio_unitario))
            return res.status(400).json({ exito: false, mensaje: 'id_pedido, id_producto, cantidad y precio_unitario son obligatorios' });

        if (cantidad <= 0)
            return res.status(400).json({ exito: false, mensaje: 'La cantidad debe ser mayor a 0' });

        try
        {
            const detalle = await detallePedidoModelo.crearDetalle(id_pedido, id_producto, cantidad, precio_unitario);
            return res.status(201).json({ exito: true, data: detalle });
        }
        catch (error)
        {
            if (error.code === 'ER_NO_REFERENCED_ROW_2')
                return res.status(400).json({ exito: false, mensaje: 'El pedido o el producto no existe' });

            return res.status(500).json({ exito: false, mensaje: 'Error al crear detalle' });
        }
    }

    static async actualizarDetalle(req, res)
    {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

        if (faltan(id_pedido, id_producto, cantidad, precio_unitario))
            return res.status(400).json({ exito: false, mensaje: 'id_pedido, id_producto, cantidad y precio_unitario son obligatorios' });

        if (cantidad <= 0)
            return res.status(400).json({ exito: false, mensaje: 'La cantidad debe ser mayor a 0' });

        try
        {
            const filas = await detallePedidoModelo.actualizarDetalle(req.params.id, id_pedido, id_producto, cantidad, precio_unitario);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Detalle no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Detalle actualizado' });
        }
        catch (error)
        {
            if (error.code === 'ER_NO_REFERENCED_ROW_2')
                return res.status(400).json({ exito: false, mensaje: 'El pedido o el producto no existe' });

            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar detalle' });
        }
    }

    static async eliminarDetalle(req, res)
    {
        try
        {
            const filas = await detallePedidoModelo.eliminarDetalle(req.params.id);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Detalle no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Detalle eliminado' });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar detalle' });
        }
    }
}

module.exports = detallePedidoControlador;
