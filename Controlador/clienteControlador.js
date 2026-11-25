const clientesModelo = require('../modelos/modeloCliente');

class clientesControlador {

    static async obtenerClientes(req, res)
    {
        try
        {
            const clientes = await clientesModelo.obtenerTodo();
            return res.status(200).json({ exito: true, data: clientes });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener clientes' });
        }
    }

    static async obtenerClientePorID(req, res)
    {
        try
        {
            const cliente = await clientesModelo.obtenerPorID(req.params.id);
            if (!cliente)
                return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });

            return res.status(200).json({ exito: true, data: cliente });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener cliente' });
        }
    }

    static async crearCliente(req, res)
    {
        const { nombre, ciudad, fecha_registro } = req.body;

        if (!nombre || !ciudad || !fecha_registro)
            return res.status(400).json({ exito: false, mensaje: 'nombre, ciudad y fecha_registro son obligatorios' });

        try
        {
            const cliente = await clientesModelo.crearCliente(nombre, ciudad, fecha_registro);
            return res.status(201).json({ exito: true, data: cliente });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al crear cliente' });
        }
    }

    static async actualizarCliente(req, res)
    {
        const { nombre, ciudad, fecha_registro } = req.body;

        if (!nombre || !ciudad || !fecha_registro)
            return res.status(400).json({ exito: false, mensaje: 'nombre, ciudad y fecha_registro son obligatorios' });

        try
        {
            const filas = await clientesModelo.actualizarCliente(req.params.id, nombre, ciudad, fecha_registro);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Cliente actualizado' });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar cliente' });
        }
    }

    static async eliminarCliente(req, res)
    {
        try
        {
            const filas = await clientesModelo.eliminarCliente(req.params.id);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Cliente eliminado' });
        }
        catch (error)
        {
            if (error.code === 'ER_ROW_IS_REFERENCED_2')
                return res.status(409).json({ exito: false, mensaje: 'No se puede eliminar: el cliente tiene pedidos' });

            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar cliente' });
        }
    }
}

module.exports = clientesControlador;
