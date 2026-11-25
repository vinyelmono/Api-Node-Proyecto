const productosModelo = require('../modelos/modeloProducto');

// precio, costo y stock pueden ser 0, por eso se revisa contra undefined/null y no con !valor
function faltan(...valores)
{
    return valores.some(v => v === undefined || v === null || v === '');
}

class productosControlador {

    static async obtenerProductos(req, res)
    {
        try
        {
            const productos = await productosModelo.obtenerTodo();
            return res.status(200).json({ exito: true, data: productos });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener productos' });
        }
    }

    static async obtenerProductoPorID(req, res)
    {
        try
        {
            const producto = await productosModelo.obtenerPorID(req.params.id);
            if (!producto)
                return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });

            return res.status(200).json({ exito: true, data: producto });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener producto' });
        }
    }

    static async obtenerProductosConCategoria(req, res)
    {
        try
        {
            const productos = await productosModelo.obtenerConCategoria();
            return res.status(200).json({ exito: true, data: productos });
        }
        catch (error)
        {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener productos con categoría' });
        }
    }

    static async crearProducto(req, res)
    {
        const { nombre, id_categoria, precio, costo, stock } = req.body;

        if (faltan(nombre, precio, costo, stock))
            return res.status(400).json({ exito: false, mensaje: 'nombre, precio, costo y stock son obligatorios' });

        try
        {
            const producto = await productosModelo.crearProducto(nombre, id_categoria ?? null, precio, costo, stock);
            return res.status(201).json({ exito: true, data: producto });
        }
        catch (error)
        {
            if (error.code === 'ER_NO_REFERENCED_ROW_2')
                return res.status(400).json({ exito: false, mensaje: 'La categoría no existe' });

            return res.status(500).json({ exito: false, mensaje: 'Error al crear producto' });
        }
    }

    static async actualizarProducto(req, res)
    {
        const { nombre, id_categoria, precio, costo, stock } = req.body;

        if (faltan(nombre, precio, costo, stock))
            return res.status(400).json({ exito: false, mensaje: 'nombre, precio, costo y stock son obligatorios' });

        try
        {
            const filas = await productosModelo.actualizarProducto(req.params.id, nombre, id_categoria ?? null, precio, costo, stock);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Producto actualizado' });
        }
        catch (error)
        {
            if (error.code === 'ER_NO_REFERENCED_ROW_2')
                return res.status(400).json({ exito: false, mensaje: 'La categoría no existe' });

            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar producto' });
        }
    }

    static async eliminarProducto(req, res)
    {
        try
        {
            const filas = await productosModelo.eliminarProducto(req.params.id);
            if (filas === 0)
                return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });

            return res.status(200).json({ exito: true, mensaje: 'Producto eliminado' });
        }
        catch (error)
        {
            if (error.code === 'ER_ROW_IS_REFERENCED_2')
                return res.status(409).json({ exito: false, mensaje: 'No se puede eliminar: el producto aparece en pedidos' });

            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar producto' });
        }
    }
}

module.exports = productosControlador;
