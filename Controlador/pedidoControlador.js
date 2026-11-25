const pedidosModelo = require('../modelos/modeloPedido');

class pedidosControlador {

    static async obtenerPedidos(req, res)
    {
        try
        {
            const pedidos = await pedidosModelo.obtenerTodo();
            return res.status(200).json({ exito: true, data: pedidos });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener pedidos' });
        }
    }

    static async obtenerPedidoPorID(req, res)
    {
        try
        {
            const pedido = await pedidosModelo.obtenerPorID(req.params.id);
            if (!pedido)
                return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });

            return res.status(200).json({ exito: true, data: pedido });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener pedido' });
        }
    }

    static async obtenerPedidosConCliente(req, res)
    {
        try
        {
            const pedidos = await pedidosModelo.obtenerConCliente();
            return res.status(200).json({ exito: true, data: pedidos });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener pedidos con cliente' });
        }
    }

    static async crearPedido(req, res)
    {
        const { id_cliente, id_empleado, fecha_pedido, canal } = req.body;

        // id_cliente e id_empleado pueden ir vacíos (la tabla los permite NULL)
        if (!fecha_pedido || !canal)
            return res.status(400).json({ exito: false, mensaje: 'fecha_pedido y canal son obligatorios' });

        try
        {
            const pedido = await pedidosModelo.crearPedido(id_cliente ?? null, id_empleado ?? null, fecha_pedido, canal);
            return res.status(201).json({ exito: true, data: pedido });
        }
        catch (error)
        {
            if (error.code === 'ER_NO_REFERENCED_ROW_2')
                return res.status(400).json({ exito: false, mensaje: 'El cliente o el empleado no existe' });

            return res.status(500).json({ exito: false, mensaje: 'Error al crear pedido' });
        }
    }

    static async actualizarPedido(req, res)
    {
        const { id_cliente, id_empleado, fecha_pedido, canal } = req.body;

        if (!fecha_pedido || !canal)
            return res.status(400).json({ exito: false, mensaje: 'fecha_pedido y canal son obligatorios' });

        try
        {
            const filas = await pedidosModelo.actualizarPedido(req.params.id, id_cliente ?? null, id_empleado ?? null, fecha_pedido, canal);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Pedido actualizado' });
        }
        catch (error)
        {
            if (error.code === 'ER_NO_REFERENCED_ROW_2')
                return res.status(400).json({ exito: false, mensaje: 'El cliente o el empleado no existe' });

            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar pedido' });
        }
    }

    static async eliminarPedido(req, res)
    {
        try
        {
            const filas = await pedidosModelo.eliminarPedido(req.params.id);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Pedido eliminado' });
        }
        catch (error)
        {
            if (error.code === 'ER_ROW_IS_REFERENCED_2')
                return res.status(409).json({ exito: false, mensaje: 'No se puede eliminar: el pedido tiene detalles' });

            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar pedido' });
        }
    }
}

module.exports = pedidosControlador;
