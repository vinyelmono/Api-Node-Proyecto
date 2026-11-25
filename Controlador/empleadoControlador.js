const modeloEmpleado = require('../modelos/modeloEmpleado');

class empleadoControlador{

    static async obtenerEmpleados(req,res){

        try
        {
                const empleados = await modeloEmpleado.obtenerTodos();
                return res.status(200).json({exito:true, data: empleados});
        }
        catch(error)
        {
                return res.status(500).json({exito:false, mensaje: 'Error al obtener a Todos los empleados'});
        }
    }

    static async obtenerEmpleadosPorId(req,res){

        try
        {
                const empleado = await modeloEmpleado.obtenerEmpleadosPorId(req.params.id);

                if(!empleado)
                        return res.status(404).json({exito:false, mensaje: 'Empleado no encontrado'});

                return res.status(200).json({exito:true, data: empleado});
        }
        catch(error)
        {
                return res.status(500).json({exito:false, mensaje: 'Error al obtener al empleado'});
        }
    }

    static async CrearEmpleado(req,res)
    {
        const {nombre, area} = req.body;

        if(!nombre || !area)
                return res.status(400).json({exito:false, mensaje: 'nombre y area son requeridos'});

        try
        {
                const nuevoEmpleado = await modeloEmpleado.CrearEmpleado(nombre, area);
                return res.status(201).json({exito: true, data: nuevoEmpleado});
        }
        catch(error)
        {
                return res.status(500).json({exito:false, mensaje: 'Error al crear empleado'});
        }
    }

    static async ActualizarEmpleado(req,res)
    {
        const {nombre, area} = req.body;

        if(!nombre || !area)
                return res.status(400).json({exito:false, mensaje: 'nombre y area son requeridos'});

        try
        {
                const filas = await modeloEmpleado.ActualizarEmpleado(req.params.id, nombre, area);

                if(filas === 0)
                        return res.status(404).json({exito:false, mensaje: 'Empleado no encontrado'});

                return res.status(200).json({exito:true, mensaje: 'Empleado actualizado'});
        }
        catch(error)
        {
                return res.status(500).json({exito:false, mensaje: 'Error al actualizar empleado'});
        }
    }

    static async EliminarEmpleado(req,res)
    {
        try
        {
                const filas = await modeloEmpleado.EliminarEmpleado(req.params.id);

                if(filas === 0)
                        return res.status(404).json({exito:false, mensaje: 'Empleado no encontrado'});

                return res.status(200).json({exito:true, mensaje: 'Empleado eliminado'});
        }
        catch(error)
        {
                if(error.code === 'ER_ROW_IS_REFERENCED_2')
                        return res.status(409).json({exito:false, mensaje: 'No se puede eliminar: el empleado tiene pedidos'});

                return res.status(500).json({exito:false, mensaje: 'Error al eliminar empleado'});
        }
    }
}

module.exports = empleadoControlador;
