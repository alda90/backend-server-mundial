var express = require('express');
var app = express();

var Confederacion = require('../models/confederacion');


// ===========================================
// Obtener Confederaciones
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Confederacion.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, confederacion) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando confederacion',
                        errors: err
                    });
                }

                Confederacion.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        confederacion: confederacion,
                        total: conteo
                    });
                })



            })

});

// ==========================================
//  Obtener Confederacion por ID
// ==========================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Confederacion.findById(id, 'siglas')
        .exec((err, confederacion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar confederacion',
                    errors: err
                });
            }
            if (!confederacion) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La confederación con el id ' + id + ' no existe',
                    errors: {
                        message: 'No existe una confederacion con ese ID'
                    }
                });
            }
            res.status(200).json({
                ok: true,
                confederacion: confederacion
            });
        })

});

////////////////////
/// Crear Confederacion
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var confederacion = new Confederacion({
        confederacion: body.confederacion,
        acronimo: body.acronimo,
        siglas: body.siglas,
        fundacion: body.fundacion,
        sede: body.sede,
        ambito: body.ambito,
        presidente: body.presidente
    });

    confederacion.save((err, confederacionGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Confederacion',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            confederacion: confederacionGuardado
        });
    });



});


////////////////////
/// Actualizar Confederacion
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Confederacion.findById(id, (err, confederacion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!confederacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La confederacion con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        confederacion.confederacion = body.confederacion;
        confederacion.acronimo = body.acronimo;
        confederacion.siglas = body.siglas;
        confederacion.fundacion = body.fundacion;
        confederacion.sede = body.sede;
        confederacion.ambito = body.ambito;
        confederacion.presidente = body.presidente;

        confederacion.save((err, confederacionGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar confederacion',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                confederacion: confederacionGuardado
            });
        });

    });

});

// ===========================================
// Borrar Confederacion
// ===========================================


app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Confederacion.findByIdAndRemove(id, (err, confederacionBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar confederacion',
                errors: err
            });
        }

        if (!confederacionBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe confederacion con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            confederacion: confederacionBorrado
        });
    });
});

module.exports = app;