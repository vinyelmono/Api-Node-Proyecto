const pull = require('../src/bd');

class pedidosModelo {

    static async obtenerTodo()
    {
        const [rows] = await pull.query('SELECT * FROM pedidos');
        return rows;
    }

    static async obtenerPorID(id)
    {
        const [rows] = await pull.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
        return rows[0];
    }

    // INNER JOIN pedidos + clientes (los pedidos sin cliente no aparecen)
    static async obtenerConCliente()
    {
        const [rows] = await pull.query(`
            SELECT p.id_pedido, p.fecha_pedido, p.canal, c.id_cliente, c.nombre AS nombre_cliente
            FROM pedidos p
            INNER JOIN clientes c ON p.id_cliente = c.id_cliente
            ORDER BY p.id_pedido
        `);
        return rows;
    }

    static async crearPedido(id_cliente, id_empleado, fecha_pedido, canal)
    {
        const [[{ siguiente }]] = await pull.query('SELECT IFNULL(MAX(id_pedido), 0) + 1 AS siguiente FROM pedidos');
        await pull.query(
            'INSERT INTO pedidos (id_pedido, id_cliente, id_empleado, fecha_pedido, canal) VALUES (?, ?, ?, ?, ?)',
            [siguiente, id_cliente, id_empleado, fecha_pedido, canal]
        );
        return { id_pedido: siguiente, id_cliente, id_empleado, fecha_pedido, canal };
    }

    static async actualizarPedido(id, id_cliente, id_empleado, fecha_pedido, canal)
    {
        const [result] = await pull.query(
            'UPDATE pedidos SET id_cliente = ?, id_empleado = ?, fecha_pedido = ?, canal = ? WHERE id_pedido = ?',
            [id_cliente, id_empleado, fecha_pedido, canal, id]
        );
        return result.affectedRows;
    }

    static async eliminarPedido(id)
    {
        const [result] = await pull.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = pedidosModelo;
