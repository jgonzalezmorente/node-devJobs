const connection = require( './config/db' );
const express = require( 'express' );
const exphb = require( 'express-handlebars' );
const path = require( 'path' );
const router = require( './routes' );
const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' );
const flash = require( 'connect-flash' );
const passport = require( './config/passport' );

require( 'dotenv' ).config( { path: 'variables.env' } );

const app = express();

// Habilitar parser
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ));

// Habilitar handlebars como view
app.engine( 'handlebars',
    exphb.engine({
        defaultLayout: 'layout',
        helpers: require( './helpers/handlebars' )
    })
);

app.set( 'view engine', 'handlebars' );

// Ficheros estáticos
app.use( express.static( path.join(__dirname, 'public' ) ) );

// Sesiones
app.use( session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        clientPromise: connection.then( m => m.connection.getClient() ),
        dbName: 'devjobs'
    })
}));

// Inicializar passport
app.use( passport.initialize() );
app.use( passport.session() );

// Alertas y flash message
app.use( flash() );

// Crear nuestro middleware
app.use( ( req, res, next ) => {
    res.locals.mensajes = req.flash();    
    next();
});

// Rutas
app.use( '/', router() );

app.listen( process.env.PUERTO );