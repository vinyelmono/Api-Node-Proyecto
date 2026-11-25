
const pull = require('../src/bd');

class usuarioModelo{

    static async obtenerTodos()
    {
        const[rows] = await pull.query('SELECT * FROM empleados');
        return rows;
    }

    static async obtenerEmpleadosPorId(id)
    {
        const[rows] = await pull.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);
        return rows[0];
    }

    static async CrearEmpleado(nombre,area)
    {
        // Se calcula el siguiente id por si la tabla no tiene AUTO_INCREMENT
        const[[{siguiente}]] = await pull.query('SELECT IFNULL(MAX(id_empleado), 0) + 1 AS siguiente FROM empleados');
        await pull.query('INSERT INTO empleados(id_empleado,nombre,area) VALUES (?,?,?)', [siguiente,nombre,area]);
        return {id_empleado: siguiente, nombre, area};
    }

    static async ActualizarEmpleado(id,nombre,area)
    {
        const[result] = await pull.query('UPDATE empleados SET nombre = ?, area = ? WHERE id_empleado = ?', [nombre,area,id]);
        return result.affectedRows;
    }

    static async EliminarEmpleado(id)
    {
        const[result] = await pull.query('DELETE FROM empleados WHERE id_empleado = ?', [id]);
        return result.affectedRows;
    }

}


module.exports = usuarioModelo;
