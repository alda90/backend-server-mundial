var express = require('express');

const fileUpload = require('express-fileupload');

var fs = require('fs');

var app = express();
// default options
app.use(fileUpload())

var Usuario = require('../models/usuario');
var Arbitro = require('../models/arbitro');
var Pais = require('../models/pais');
var Tecnico = require('../models/tecnico');
var Estadio = require('../models/estadio');
var Jugador = require('../models/jugador');

app.put('/:tabla/:tipo/:id', (req, res, next) => {

    var tabla = req.params.tabla;
    var tipo = req.params.tipo;
    var id = req.params.id;

    // tipos de colección
    var tiposValidos = ['banderas', 'escudos', 'escudosfed', 'estadios', 'jugadores', 'tecnicos', 'uniformev', 'uniforme', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de imagen no  válida',
            errors: { message: 'Tipo de imagen no es válida' }
        });
    }

    var tablasValidas = ['usuarios', 'arbitros', 'estadios', 'escudosfed', 'jugadores', 'tecnicos', 'paises'];
    if (tablasValidas.indexOf(tabla) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no  es válida',
            errors: { message: 'Tipo de colección no es válida' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleccionó nada',
            errors: { message: 'Debe seleccionar una imagen' }
        });
    }

    //Obtener nombre del archivo

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extArchivo = nombreCortado[nombreCortado.length - 1];


    // Solo estas extensiones aceptamos
    var extensiones = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensiones.indexOf(extArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'extensión no válida',
            errors: { message: 'Las extensiones válidas son ' + extensiones.join(', ') }
        });
    }


    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${extArchivo}`;

    // mover archivo del temporal a  un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(tabla, tipo, id, nombreArchivo, res);


    })



});


function subirPorTipo(tabla, tipo, id, nombreArchivo, res) {
    if (tipo === 'usuarios') {
        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                })
            }


            var pathViejo = './uploads/usuarios/' + usuario.img;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = ':>';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                })
            })
        });
    }

    if (tipo === 'banderas') {

        if (tabla === 'arbitros') {

            Arbitro.findById(id, (err, arbitro) => {
                if (!arbitro) {
                    return res.status(400).json({
                        ok: true,
                        mensaje: 'Arbitro no existe',
                        errors: { message: 'Arbitro no existe' }
                    })
                }

                var pathViejo = './uploads/banderas/' + arbitro.bandera;

                // si existe elimina la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo);
                }

                arbitro.bandera = nombreArchivo;
                arbitro.save((err, arbitroActualizado) => {

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Bandera de arbitro actualizada',
                        arbitro: arbitroActualizado
                    })
                })
            });
        }

        if (tabla === 'paises') {

            Pais.findById(id, (err, pais) => {
                if (!pais) {
                    return res.status(400).json({
                        ok: true,
                        mensaje: 'Pais no existe',
                        errors: { message: 'Pais no existe' }
                    })
                }

                var pathViejo = './uploads/banderas/' + pais.bandera;

                // si existe elimina la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo);
                }

                pais.bandera = nombreArchivo;
                pais.save((err, paisActualizado) => {

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Bandera de pais actualizada',
                        pais: paisActualizado
                    })
                })
            });
        }

        if (tabla === 'tecnicos') {
            Tecnico.findById(id, (err, tecnico) => {

                if (!tecnico) {
                    return res.status(400).json({
                        ok: true,
                        mensaje: 'Tecnico no existe',
                        errors: { message: 'Tecnico no existe' }
                    })
                }

                var pathViejo = './uploads/banderas/' + tecnico.bandera;

                // si existe elimina la imagen anterior
                if (fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo);
                }

                tecnico.bandera = nombreArchivo;
                tecnico.save((err, tecnicoActualizado) => {

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de tecnico actualizada',
                        tecnico: tecnicoActualizado
                    })
                })
            });
        }

    }


    if (tipo === 'estadios') {
        Estadio.findById(id, (err, estadio) => {

            if (!estadio) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Estadio no existe',
                    errors: { message: 'Estadio no existe' }
                })
            }

            var pathViejo = './uploads/estadios/' + estadio.img;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            estadio.img = nombreArchivo;
            estadio.save((err, estadioActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de estadio actualizada',
                    estadio: estadioActualizado
                })
            })
        });
    }

    if (tipo === 'jugadores') {
        Jugador.findById(id, (err, jugador) => {

            if (!jugador) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Jugador no existe',
                    errors: { message: 'Jugador no existe' }
                })
            }

            var pathViejo = './uploads/jugadores/' + jugador.img;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            jugador.img = nombreArchivo;
            jugador.save((err, jugadorActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de jugador actualizada',
                    jugador: jugadorActualizado
                })
            })
        });
    }

    if (tipo === 'tecnicos') {
        Tecnico.findById(id, (err, tecnico) => {

            if (!tecnico) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Tecnico no existe',
                    errors: { message: 'Tecnico no existe' }
                })
            }

            var pathViejo = './uploads/tecnicos/' + tecnico.img;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            tecnico.img = nombreArchivo;
            tecnico.save((err, tecnicoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de tecnico actualizada',
                    tecnico: tecnicoActualizado
                })
            })
        });
    }

    if (tipo === 'escudos') {
        Pais.findById(id, (err, pais) => {
            if (!pais) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Pais no existe',
                    errors: { message: 'Pais no existe' }
                })
            }

            var pathViejo = './uploads/escudos/' + pais.escudo;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            pais.escudo = nombreArchivo;
            pais.save((err, paisActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Escudo de pais actualizada',
                    pais: paisActualizado
                })
            })
        });
    }

    if (tipo === 'escudosfed') {
        Pais.findById(id, (err, pais) => {
            if (!pais) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Pais no existe',
                    errors: { message: 'Pais no existe' }
                })
            }

            var pathViejo = './uploads/escudosfed/' + pais.escudofed;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            pais.escudofed = nombreArchivo;
            pais.save((err, paisActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Escudo Federación de pais actualizada',
                    pais: paisActualizado
                })
            })
        });
    }

    if (tipo === 'uniforme') {
        Pais.findById(id, (err, pais) => {
            if (!pais) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Pais no existe',
                    errors: { message: 'Pais no existe' }
                })
            }

            var pathViejo = './uploads/uniforme/' + pais.uniforme;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            pais.uniforme = nombreArchivo;
            pais.save((err, paisActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Uniforme de pais actualizada',
                    pais: paisActualizado
                })
            })
        });
    }

    if (tipo === 'uniformev') {
        Pais.findById(id, (err, pais) => {
            if (!pais) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Pais no existe',
                    errors: { message: 'Pais no existe' }
                })
            }

            var pathViejo = './uploads/uniformev/' + pais.uniformev;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            pais.uniformev = nombreArchivo;
            pais.save((err, paisActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Uniforme de visita de pais actualizada',
                    pais: paisActualizado
                })
            })
        });
    }


}

module.exports = app;