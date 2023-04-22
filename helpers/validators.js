const confirmarPassword = ( confirmar, { req } ) => {
    if ( confirmar !== req.body.password ) {
        throw new Error( 'Las constraseñas no coinciden' );
    }
    return true;
}

module.exports = {
    confirmarPassword
}