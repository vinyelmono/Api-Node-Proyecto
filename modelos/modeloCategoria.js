const pull = require('../src/bd');

class categoriasModelo {

    static async obtenerTodo()
    {
        const [rows] = await pull.query('SELECT * FROM categorias');
        return rows;
    }

    static async obtenerPorID(id)
    {
        const [rows] = await pull.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
        return rows[0];
    }

    static async crearCategoria(nombre)
    {
        const [[{ siguiente }]] = await pull.query('SELECT IFNULL(MAX(id_categoria), 0) + 1 AS siguiente FROM categorias');
        await pull.query('INSERT INTO categorias (id_categoria, nombre) VALUES (?, ?)', [siguiente, nombre]);
        return { id_categoria: siguiente, nombre };
    }

    static async actualizarCategoria(id, nombre)
    {
        const [result] = await pull.query('UPDATE categorias SET nombre = ? WHERE id_categoria = ?', [nombre, id]);
        return result.affectedRows;
    }

    static async eliminarCategoria(id)
    {
        const [result] = await pull.query('DELETE FROM categorias WHERE id_categoria = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = categoriasModelo;
