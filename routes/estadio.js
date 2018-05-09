var express = require('express');
var app = express();

var Estadio = require('../models/estadio');


// ===========================================
// Obtener Estadio
// ===========================================

app.get('/', (req, res, next) => {



    Estadio.find({})
        .populate('sede', 'sede')
        .exec(
            (err, estadio) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando estadio',
                        errors: err
                    });
                }

                Estadio.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        estadio: estadio,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Estadio By Id
// ===========================================

app.post('/estadio', (req, res, next) => {

    var body = req.body;
    var id = body.idestadio;

    Estadio.findById(id)
        .exec(
            (err, estadio) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando estadio',
                        errors: err
                    });
                }

                Estadio.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        estadio: estadio

                    });
                })



            })

});

////////////////////
/// Crear Estadio
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var estadio = new Estadio({
        estadio: body.estadio,
        completo: body.completo,
        estadiolocal: body.estadiolocal,
        capacidad: body.capacidad,
        sede: body.sede
    });

    estadio.save((err, estadioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Estadio',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            estadio: estadioGuardado
        });
    });



});


////////////////////
/// Actualizar Estadio
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Estadio.findById(id, (err, estadio) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar estadio',
                errors: err
            });
        }

        if (!estadio) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El estadio con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        estadio.estadio = body.estadio;
        estadio.completo = body.completo;
        estadio.estadiolocal = body.estadiolocal;
        estadio.capacidad = body.capacidad;
        estadio.sede = body.sede;

        estadio.save((err, estadioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar estadio',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                estadio: estadioGuardado
            });
        });

    });

});



module.exports = app;