// Requires

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// Inicializar variables

var app = express();

// CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept,Credentials");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var confederacionRoutes = require('./routes/confederacion');
var tecnicoRoutes = require('./routes/tecnico');
var arbitroRoutes = require('./routes/arbitro');
var grupoRoutes = require('./routes/grupo');
var paisRoutes = require('./routes/pais');
var estadisticaRoutes = require('./routes/estadistica');
var jugadorRoutes = require('./routes/jugador');
var sedeRoutes = require('./routes/sede');
var seudonimoRoutes = require('./routes/seudonimo');
var estadioRoutes = require('./routes/estadio');
var partidoRoutes = require('./routes/partido');
var alineacionRoutes = require('./routes/alineacion');
var incidenciaRoutes = require('./routes/incidencia');
var arbitrospartRoutes = require('./routes/arbitrospart');


// Conexión a  la base de datos
//mongodb://<mongoalda>:<m0ng04ld4>@ds014658.mlab.com:14658/mundial
//mongodb://localhost:27017/mundial

mongoose.connection.openUri('mongodb://mongoalda:m0ng04ld4@ds014658.mlab.com:14658/mundial', (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});


//  Rutas
app.use('/arbitrospart', arbitrospartRoutes);
app.use('/incidencia', incidenciaRoutes);
app.use('/alineacion', alineacionRoutes);
app.use('/partido', partidoRoutes);
app.use('/estadio', estadioRoutes);
app.use('/seudonimo', seudonimoRoutes);
app.use('/sede', sedeRoutes);
app.use('/jugador', jugadorRoutes);
app.use('/estadistica', estadisticaRoutes);
app.use('/pais', paisRoutes);
app.use('/grupo', grupoRoutes);
app.use('/arbitro', arbitroRoutes);
app.use('/tecnico', tecnicoRoutes);
app.use('/confederacion', confederacionRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes);



//  Escuchar Peticiones

app.listen(process.env.PORT, () => {
    console.log('Espress PORT');
});

/*app.listen(3000, () => {
    console.log('Espress PORT 3000');
});*/