var express = require('express');
var app = express();

var Alineacion = require('../models/alineacion');


// ===========================================
// Obtener Alineacion
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Alineacion.find({})
        .populate('jugador', 'nombre')
        .populate('pais', 'pais')
        .exec(
            (err, alineacion) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando alineacion',
                        errors: err
                    });
                }

                Alineacion.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        alineacion: alineacion,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Alineacion por partido y Pais
// ===========================================

app.post('/partidopais', (req, res, next) => {

    var body = req.body;
    var partido = body.idpartido;
    var pais = body.idpais;

    Alineacion.find({ partido: partido, pais: pais })
        .populate('jugador', 'nombre posicion')
        .populate('pais', 'pais')
        .exec(
            (err, alineacion) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando alineacion',
                        errors: err
                    });
                }

                Alineacion.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        alineacion: alineacion,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Alineacion por partido 
// ===========================================

app.post('/partido', (req, res, next) => {

    var body = req.body;
    var partido = body.idpartido;

    Alineacion.find({ partido: partido })
        .populate('jugador', 'nombre posicion')
        .populate('pais', 'pais')
        .exec(
            (err, alineacion) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando alineacion',
                        errors: err
                    });
                }

                Alineacion.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        alineacion: alineacion,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Alineacion por pais
// ===========================================

app.post('/pais', (req, res, next) => {

    var body = req.body;
    var pais = body.pais;

    Alineacion.find({ pais: pais })
        .populate('jugador', 'nombre nombrecompleto nombrelocal img numero nacimiento fechanac posicion')
        .populate('pais', 'pais')
        .exec(
            (err, alineacion) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando alineacion',
                        errors: err
                    });
                }

                Alineacion.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        alineacion: alineacion,
                        total: conteo
                    });
                })



            })

});

////////////////////
/// Crear Alineacion
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var alineacion = new Alineacion({
        estatus: body.estatus,
        capitan: body.capitan,
        partido: body.partido,
        jugador: body.jugador,
        pais: body.pais
    });

    alineacion.save((err, alineacionGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Alineacion',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            alineacion: alineacionGuardado
        });
    });



});


////////////////////
/// Actualizar Alineacion
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Alineacion.findById(id, (err, alineacion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar alineacion',
                errors: err
            });
        }

        if (!alineacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El alineacion con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        alineacion.estatus = body.estatus;
        alineacion.capitan = body.capitan;
        alineacion.partido = body.partido;
        alineacion.jugador = body.jugador;
        alineacion.pais = body.pais;

        alineacion.save((err, alineacionGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar alineacion',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                alineacion: alineacionGuardado
            });
        });

    });

});



module.exports = app;