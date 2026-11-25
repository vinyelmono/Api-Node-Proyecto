const pull = require('../src/bd');

class productosModelo {

    static async obtenerTodo()
    {
        const [rows] = await pull.query('SELECT * FROM productos');
        return rows;
    }

    static async obtenerPorID(id)
    {
        const [rows] = await pull.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        return rows[0];
    }

    // INNER JOIN productos + categorias
    static async obtenerConCategoria()
    {
        const [rows] = await pull.query(`
            SELECT p.id_producto, p.nombre, p.precio, p.costo, p.stock,
                   c.id_categoria, c.nombre AS nombre_categoria
            FROM productos p
            INNER JOIN categorias c ON p.id_categoria = c.id_categoria
            ORDER BY p.id_producto
        `);
        return rows;
    }

    static async crearProducto(nombre, id_categoria, precio, costo, stock)
    {
        const [[{ siguiente }]] = await pull.query('SELECT IFNULL(MAX(id_producto), 0) + 1 AS siguiente FROM productos');
        await pull.query(
            'INSERT INTO productos (id_producto, nombre, id_categoria, precio, costo, stock) VALUES (?, ?, ?, ?, ?, ?)',
            [siguiente, nombre, id_categoria, precio, costo, stock]
        );
        return { id_producto: siguiente, nombre, id_categoria, precio, costo, stock };
    }

    static async actualizarProducto(id, nombre, id_categoria, precio, costo, stock)
    {
        const [result] = await pull.query(
            'UPDATE productos SET nombre = ?, id_categoria = ?, precio = ?, costo = ?, stock = ? WHERE id_producto = ?',
            [nombre, id_categoria, precio, costo, stock, id]
        );
        return result.affectedRows;
    }

    static async eliminarProducto(id)
    {
        const [result] = await pull.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = productosModelo;
