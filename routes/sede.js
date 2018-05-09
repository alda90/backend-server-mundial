var express = require('express');
var app = express();

var Sede = require('../models/sede');


// ===========================================
// Obtener Sedes
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Sede.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, sede) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando sede',
                        errors: err
                    });
                }

                Sede.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        sede: sede,
                        total: conteo
                    });
                })



            })

});

// ==========================================
//  Obtener Sede por ID
// ==========================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Sede.findById(id)
        .exec((err, sede) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar sede',
                    errors: err
                });
            }
            if (!sede) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La sede con el id ' + id + ' no existe',
                    errors: {
                        message: 'No existe una sede con ese ID'
                    }
                });
            }
            res.status(200).json({
                ok: true,
                sede: sede
            });
        })

});

////////////////////
/// Crear Confederacion
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var sede = new Sede({
        sede: body.sede,
        sedeingles: body.sedeingles,
        sedelocal: body.sedelocal
    });

    sede.save((err, sedeGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Sede',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            sede: sedeGuardado
        });
    });



});


////////////////////
/// Actualizar Sede
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Sede.findById(id, (err, sede) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar sede',
                errors: err
            });
        }

        if (!sede) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El sede con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        sede.sede = body.sede;
        sede.sedeingles = body.sedeingles;
        sede.sedelocal = body.sedelocal;


        sede.save((err, sedeGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar sede',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                sede: sedeGuardado
            });
        });

    });

});



module.exports = app;