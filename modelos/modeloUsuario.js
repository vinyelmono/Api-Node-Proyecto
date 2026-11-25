let usuarios = [

    {id:1, nombre: 'Juan', correo: 'juan@example.com'},
    {id:2, nombre: 'Maria', correo: 'maria@example.com'}

];

class usuarioModelo{

    static obtenerUsuarios(){
        return usuarios;
    }

    static obtenerUsuarioPorId(id){

        return usuarios.find(u =>u.id ===parseInt(id));
    }

    static CrearUsuario(datos){
        
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre: datos.nombre,
            correo: datos.correo
        };
        usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    static actualizar(id, datos)
    {
       
      const usuario = this.obtenerUsuarioPorId(id);
      

      if(!usuario) {
        return null;
      }

      usuario.nombre = datos.nombre || usuario.nombre;
      usuario.correo = datos.correo || usuario.correo;
      return usuario;
    }

    static eliminar(id){

         const indice = usuarios.findIndex(u => u.id === parseInt(id))
        if(indice === -1){
            return null;
        }

        usuarios.splice(indice,1);


        return true;
    }
}

module.exports = usuarioModelo;