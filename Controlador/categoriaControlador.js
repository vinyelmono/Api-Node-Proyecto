const categoriasModelo = require('../modelos/modeloCategoria');

class categoriasControlador {

    static async obtenerCategorias(req, res)
    {
        try
        {
            const categorias = await categoriasModelo.obtenerTodo();
            return res.status(200).json({ exito: true, data: categorias });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener categorías' });
        }
    }

    static async obtenerCategoriaPorID(req, res)
    {
        try
        {
            const categoria = await categoriasModelo.obtenerPorID(req.params.id);
            if (!categoria)
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });

            return res.status(200).json({ exito: true, data: categoria });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener categoría' });
        }
    }

    static async crearCategoria(req, res)
    {
        const { nombre } = req.body;

        if (!nombre)
            return res.status(400).json({ exito: false, mensaje: 'nombre es obligatorio' });

        try
        {
            const categoria = await categoriasModelo.crearCategoria(nombre);
            return res.status(201).json({ exito: true, data: categoria });
        }
        catch (error)
        {
            if (error.code === 'ER_DUP_ENTRY')
                return res.status(409).json({ exito: false, mensaje: 'Ya existe una categoría con ese nombre' });

            return res.status(500).json({ exito: false, mensaje: 'Error al crear categoría' });
        }
    }

    static async actualizarCategoria(req, res)
    {
        const { nombre } = req.body;

        if (!nombre)
            return res.status(400).json({ exito: false, mensaje: 'nombre es obligatorio' });

        try
        {
            const filas = await categoriasModelo.actualizarCategoria(req.params.id, nombre);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });

            return res.status(200).json({ exito: true, mensaje: 'Categoría actualizada' });
        }
        catch (error)
        {
            if (error.code === 'ER_DUP_ENTRY')
                return res.status(409).json({ exito: false, mensaje: 'Ya existe una categoría con ese nombre' });

            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar categoría' });
        }
    }

    static async eliminarCategoria(req, res)
    {
        try
        {
            const filas = await categoriasModelo.eliminarCategoria(req.params.id);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });

            return res.status(200).json({ exito: true, mensaje: 'Categoría eliminada' });
        }
        catch (error)
        {
            if (error.code === 'ER_ROW_IS_REFERENCED_2')
                return res.status(409).json({ exito: false, mensaje: 'No se puede eliminar: la categoría tiene productos' });

            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar categoría' });
        }
    }
}

module.exports = categoriasControlador;
