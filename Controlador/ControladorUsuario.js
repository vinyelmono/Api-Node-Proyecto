const usuarioModelo = require('../modelos/modeloUsuario');

class usuarioControlador{

    static obtenerUsuarios(req,res)
    {

        const usuarios = usuarioModelo.obtenerUsuarios();
        res.status(200).json({exito: true, datos: usuarios});
    }

    static obtenerUsuarioPorId(req, res){


        const id = req.params.id;
        const usuario = usuarioModelo.obtenerUsuarioPorId(id);

        if(!usuario){

            return res.status(404).json({exito: false, mensaje: 'Usuario no encontrado'});
        }

        res.status(200).json({exito:true, datos: usuario});
    }

    static CrearUsuario(req, res){

        const {nombre, correo} = req.body;

        if(!nombre || !correo){

            return res.status(400).json({exito: false,
                mensaje: 'Nombre y correo son requeridos'
            });
        }

        const nuevoUsuario = usuarioModelo.CrearUsuario({nombre,correo});
        res.status(201).json({exito: true, datos: nuevoUsuario});
    }

    static actualizar(req, res)
    {
      const  usuarioActualizado = usuarioModelo.actualizar(req.params.id, req.body);


      if(!usuarioActualizado)
        
      {

         return res.status(404).json({exito: false, mensaje: 'Usuario no encontrado'});
      }

      return res.status(200).json({exito: true, datos: usuarioActualizado});


    }


    static eliminar(req, res)
    {
        const UsuarioPaEliminar = usuarioModelo.eliminar(req.params.id)

         
        if(!UsuarioPaEliminar){

            return res.status(404).json({exito: false, mensaje: 'no encontro usuario'});
        }

        return res.status(200).json({exito: true, mensaje: 'Usuario eliminado'});
    }
}

module.exports = usuarioControlador;