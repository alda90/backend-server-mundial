var express = require('express');
var app = express();

var Arbitro = require('../models/arbitro');


// ===========================================
// Obtener Arbitros
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Arbitro.find({})
        .skip(desde)
        .exec(
            (err, arbitro) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando arbitro',
                        errors: err
                    });
                }

                Arbitro.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        arbitro: arbitro,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Arbitro By Id
// ===========================================

app.post('/arbitro', (req, res, next) => {

    var body = req.body;
    var id = body.idarbitro;

    Arbitro.findById(id)
        .exec(
            (err, arbitro) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando arbitro',
                        errors: err
                    });
                }

                Arbitro.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        arbitro: arbitro

                    });
                })



            })

});

////////////////////
/// Crear Confederacion
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var arbitro = new Arbitro({
        arbitro: body.arbitro,
        pais: body.pais,
        bandera: body.bandera,
        posicion: body.posicion
    });

    arbitro.save((err, arbitroGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Arbitro',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            arbitro: arbitroGuardado
        });
    });



});


////////////////////
/// Actualizar Arbitro
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Arbitro.findById(id, (err, arbitro) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar arbitro',
                errors: err
            });
        }

        if (!arbitro) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El arbitro con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        arbitro.arbitro = body.arbitro;
        arbitro.pais = body.pais;
        arbitro.posicion = body.posicion;

        arbitro.save((err, arbitroGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar arbitro',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                arbitro: arbitroGuardado
            });
        });

    });

});



module.exports = app;