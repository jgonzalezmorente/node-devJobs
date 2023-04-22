const { validationResult, body } = require( 'express-validator' );

const validarRegistro = ( req, res, next ) => {

    const errores = validationResult( req );
    
    if ( !errores.isEmpty() ) {        
        req.flash( 'error', errores.errors.map( error => error.msg ) );
        res.render( 'crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        });
        return;
    }
    
    next();
}

module.exports = {
    validarRegistro
}