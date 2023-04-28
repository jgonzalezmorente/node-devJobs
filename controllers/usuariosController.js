const mongoose = require( 'mongoose' );
const Usuario = mongoose.model( 'Usuario' );

exports.formCrearCuenta = ( req, res ) => {
    res.render( 'crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}

exports.crearUsuario = async ( req, res, next ) => {

    // Crear el usuario
    const usuario = new Usuario( req.body );

    try {        
        const nuevoUsuario = await usuario.save();
        res.redirect( '/iniciar-sesion' );
    } catch (error) {        
        req.flash( 'error', error );
        return res.redirect( '/crear-cuenta' );
    }
}

// Formulario para iniciar sesión
exports.formIniciarSesion = ( req, res ) => {
    res.render( 'iniciar-sesion', {
        nombrePagina: 'Iniciar Sesión devJobs'
    });
}

// Formulario para editar perfil
exports.formEditarPerfil = ( req, res ) => {    
    res.render( 'editar-perfil', {
        nombrePagina: 'Edita tu perfil en devJobs',
        usuario: req.user.toObject()
    });
}

// Guardar cambios editar perfil
exports.editarPerfil = async( req, res ) => {
    const usuario = await Usuario.findById( req.user._id );
    
    usuario.nombre = req.body.nombre;    
    usuario.email = req.body.email;    

    if ( req.body.password ) {
        usuario.password = req.body.password;
    }

    await usuario.save();

    req.flash( 'correcto', 'Cambios guardados correctamente' );
    
    res.redirect( '/administracion' );

}