const express = require( 'express' ) ;
const router = express.Router();
const homeController = require( '../controllers/homeController' );
const vacantesController = require( '../controllers/vacantesController' );
const usuariosController = require( '../controllers/usuariosController' );
const authController = require( '../controllers/authController' );
const { validarRegistro } = require('../middlewares/validar-registro');
const { body } = require( 'express-validator' );
const { confirmarPassword } = require('../helpers/validators');


module.exports = () => {
    router.get( '/', homeController.mostrarTrabajos );

    // Crear vacantes
    router.get( '/vacantes/nueva', 
        authController.verificarUsuario,
        vacantesController.formularioNuevaVacante
    );

    router.post( '/vacantes/nueva', 
        authController.verificarUsuario,
        vacantesController.agregarVacante
    );

    // Mostrar vacante
    router.get( '/vacantes/:url', vacantesController.mostrarVacante );

    // Editar vacante
    router.get( '/vacantes/editar/:url', 
        authController.verificarUsuario,
        vacantesController.formEditarVacante
    );

    router.post( '/vacantes/editar/:url',
        authController.verificarUsuario,
        vacantesController.editarVacante
    );

    // Crear cuenta
    router.get( '/crear-cuenta', usuariosController.formCrearCuenta );
    router.post( '/crear-cuenta',
        body( 'nombre', 'El nombre es Obligatorio' ).escape().notEmpty(),
        body( 'email', 'El email debe ser válido' ).escape().isEmail(),
        body( 'password', 'El password no puede ir vacío' ).escape().notEmpty(),
        body( 'confirmar', 'Confirmar password no puede ir vacío' ).escape().notEmpty(),
        body( 'confirmar', 'El password es diferente' ).custom( confirmarPassword ),
        validarRegistro,        
        usuariosController.crearUsuario 
    );

    // Autenticar usuarios
    router.get( '/iniciar-sesion', usuariosController.formIniciarSesion );
    router.post( '/iniciar-sesion', authController.autenticarUsuario );

    // Panel de administración
    router.get( '/administracion', 
        authController.verificarUsuario,
        authController.mostrarPanel
    );

    return router;
}