var express = require('express');
var app = express();

var Arbitrospart = require('../models/arbitrospart');


// ===========================================
// Obtener Arbitrospart
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Arbitrospart.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, arbitrospart) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando arbitrospart',
                        errors: err
                    });
                }

                Arbitrospart.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        arbitrospart: arbitrospart,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Arbitros por partido
// ===========================================

app.post('/partido', (req, res, next) => {

    var body = req.body;
    var partido = body.partido;

    Arbitrospart.find({ partido: partido })
        .populate('arbitro', {})
        .exec(
            (err, arbitrospart) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando arbitrospart',
                        errors: err
                    });
                }

                Arbitrospart.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        arbitrospart: arbitrospart,
                        total: conteo
                    });
                })



            })

});

////////////////////
/// Crear Arbitrospart
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var arbitrospart = new Arbitrospart({
        arbitro: body.arbitro,
        partido: body.partido,
        posicion: body.posicion
    });

    arbitrospart.save((err, arbitrospartGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Arbitrospart',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            arbitrospart: arbitrospartGuardado
        });
    });



});


////////////////////
/// Actualizar Arbitrospart
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Arbitrospart.findById(id, (err, arbitrospart) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar arbitrospart',
                errors: err
            });
        }

        if (!arbitrospart) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El arbitrospart con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        arbitrospart.arbitro = body.arbitro;
        arbitrospart.partido = body.partido;
        arbitrospart.posicion = body.posicion;

        arbitrospart.save((err, arbitrospartGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar arbitrospart',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                arbitrospart: arbitrospartGuardado
            });
        });

    });

});



module.exports = app;