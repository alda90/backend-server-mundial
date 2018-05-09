var express = require('express');
var app = express();

var Seudonimo = require('../models/seudonimo');


// ===========================================
// Obtener Seudonimos
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Seudonimo.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, seudonimo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando seudonimo',
                        errors: err
                    });
                }

                Seudonimo.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        seudonimo: seudonimo,
                        total: conteo
                    });
                })



            })

});

////////////////////
/// Crear Confederacion
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var seudonimo = new Seudonimo({
        seudonimo: body.seudonimo,
        local: body.local,
        localocc: body.localocc,
        pais: body.pais
    });

    seudonimo.save((err, seudonimoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Seudonimo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            seudonimo: seudonimoGuardado
        });
    });



});


////////////////////
/// Actualizar Seudonimo
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Seudonimo.findById(id, (err, seudonimo) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar seudonimo',
                errors: err
            });
        }

        if (!seudonimo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El seudonimo con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        seudonimo.seudonimo = body.seudonimo;
        seudonimo.local = body.local;
        seudonimo.localocc = body.localocc;
        seudonimo.pais = body.pais;


        seudonimo.save((err, seudonimoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar seudonimo',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                seudonimo: seudonimoGuardado
            });
        });

    });

});



module.exports = app;