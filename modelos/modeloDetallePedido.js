const pull = require('../src/bd');

class detallePedidoModelo {

    static async obtenerTodo()
    {
        const [rows] = await pull.query('SELECT * FROM detalle_pedido');
        return rows;
    }

    static async obtenerPorID(id)
    {
        const [rows] = await pull.query('SELECT * FROM detalle_pedido WHERE id_detalle = ?', [id]);
        return rows[0];
    }

    // INNER JOIN detalle_pedido + productos + pedidos: lo que lleva un pedido
    static async obtenerPorPedido(id_pedido)
    {
        const [rows] = await pull.query(`
            SELECT pe.id_pedido, pe.fecha_pedido,
                   pr.nombre AS nombre_producto,
                   d.cantidad, d.precio_unitario,
                   (d.cantidad * d.precio_unitario) AS subtotal
            FROM detalle_pedido d
            INNER JOIN productos pr ON d.id_producto = pr.id_producto
            INNER JOIN pedidos pe ON d.id_pedido = pe.id_pedido
            WHERE pe.id_pedido = ?
            ORDER BY d.id_detalle
        `, [id_pedido]);
        return rows;
    }

    // INNER JOIN + GROUP BY: total vendido por producto
    static async resumenPorProducto()
    {
        const [rows] = await pull.query(`
            SELECT pr.id_producto, pr.nombre AS nombre_producto,
                   SUM(d.cantidad) AS cantidad_vendida,
                   SUM(d.cantidad * d.precio_unitario) AS total_vendido
            FROM detalle_pedido d
            INNER JOIN productos pr ON d.id_producto = pr.id_producto
            GROUP BY pr.id_producto, pr.nombre
            ORDER BY total_vendido DESC
        `);
        return rows;
    }

    // INNER JOIN + GROUP BY: total vendido por categoría
    static async resumenPorCategoria()
    {
        const [rows] = await pull.query(`
            SELECT c.id_categoria, c.nombre AS nombre_categoria,
                   SUM(d.cantidad) AS cantidad_vendida,
                   SUM(d.cantidad * d.precio_unitario) AS total_vendido
            FROM detalle_pedido d
            INNER JOIN productos pr ON d.id_producto = pr.id_producto
            INNER JOIN categorias c ON pr.id_categoria = c.id_categoria
            GROUP BY c.id_categoria, c.nombre
            ORDER BY total_vendido DESC
        `);
        return rows;
    }

    static async crearDetalle(id_pedido, id_producto, cantidad, precio_unitario)
    {
        const [[{ siguiente }]] = await pull.query('SELECT IFNULL(MAX(id_detalle), 0) + 1 AS siguiente FROM detalle_pedido');
        await pull.query(
            'INSERT INTO detalle_pedido (id_detalle, id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)',
            [siguiente, id_pedido, id_producto, cantidad, precio_unitario]
        );
        return { id_detalle: siguiente, id_pedido, id_producto, cantidad, precio_unitario };
    }

    static async actualizarDetalle(id, id_pedido, id_producto, cantidad, precio_unitario)
    {
        const [result] = await pull.query(
            'UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?',
            [id_pedido, id_producto, cantidad, precio_unitario, id]
        );
        return result.affectedRows;
    }

    static async eliminarDetalle(id)
    {
        const [result] = await pull.query('DELETE FROM detalle_pedido WHERE id_detalle = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = detallePedidoModelo;
