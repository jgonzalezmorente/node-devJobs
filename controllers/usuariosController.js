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