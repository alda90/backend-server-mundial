var express = require('express');
var app = express();

var Incidencia = require('../models/incidencia');


// ===========================================
// Obtener Incidencia
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Incidencia.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, incidencia) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando incidencia',
                        errors: err
                    });
                }

                Incidencia.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        incidencia: incidencia,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Incidencia por partido
// ===========================================

app.post('/partido', (req, res, next) => {

    var body = req.body;
    var partido = body.partido;

    Incidencia.find({ partido: partido })
        //.populate('sustituto', 'nombre')
        //.populate('jugador', 'nombre')
        //.populate('tecnico', 'nombre')
        .exec(
            (err, incidencia) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando incidencia',
                        errors: err
                    });
                }

                Incidencia.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        incidencia: incidencia,
                        total: conteo
                    });
                })



            })

});

////////////////////
/// Crear Incidencia
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;

    if (body.jugador != '' && body.sustituto != '') {
        var incidencia = new Incidencia({
            incidencia: body.incidencia,
            minuto: body.minuto,
            numpenal: body.numpenal,
            partido: body.partido,
            jugador: body.jugador,
            sustituto: body.sustituto,
            tecnico: 0
        });

    }

    if (body.jugador != '' && body.sustituto === '') {
        var incidencia = new Incidencia({
            incidencia: body.incidencia,
            minuto: body.minuto,
            numpenal: body.numpenal,
            partido: body.partido,
            jugador: body.jugador
        });

    }

    if (body.tecnico != '') {
        var incidencia = new Incidencia({
            incidencia: body.incidencia,
            minuto: body.minuto,
            numpenal: body.numpenal,
            partido: body.partido,
            tecnico: body.tecnico
        });

    }

    if (body.jugador === '' && body.sustituto === '' && body.tecnico === '') {
        var incidencia = new Incidencia({
            incidencia: body.incidencia,
            minuto: body.minuto,
            numpenal: body.numpenal,
            partido: body.partido
        });

    }


    incidencia.save((err, incidenciaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Incidencia',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            incidencia: incidenciaGuardado
        });
    });



});


////////////////////
/// Actualizar Incidencia
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Incidencia.findById(id, (err, incidencia) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar incidencia',
                errors: err
            });
        }

        if (!incidencia) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El incidencia con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }


        if (body.jugador != '' && body.sustituto != '') {
            incidencia.incidencia = body.incidencia;
            incidencia.sustituto = body.sustituto;
            incidencia.minuto = body.minuto;
            incidencia.numpenal = body.numpenal;
            incidencia.partido = body.partido;
            incidencia.jugador = body.jugador;

        }

        if (body.jugador != '' && body.sustituto === '') {
            incidencia.incidencia = body.incidencia;
            incidencia.jugador = body.jugador;
            incidencia.minuto = body.minuto;
            incidencia.numpenal = body.numpenal;
            incidencia.partido = body.partido;

        }

        if (body.tecnico != '') {
            incidencia.incidencia = body.incidencia;
            incidencia.minuto = body.minuto;
            incidencia.numpenal = body.numpenal;
            incidencia.partido = body.partido;
            incidencia.tecnico = body.tecnico;

        }

        if (body.jugador === '' && body.sustituto === '' && body.tecnico === '') {
            incidencia.incidencia = body.incidencia;
            incidencia.minuto = body.minuto;
            incidencia.numpenal = body.numpenal;
            incidencia.partido = body.partido;

        }



        incidencia.save((err, incidenciaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar incidencia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                incidencia: incidenciaGuardado
            });
        });

    });

});



module.exports = app;