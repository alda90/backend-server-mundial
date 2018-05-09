var express = require('express');
var app = express();

var Grupo = require('../models/grupo');


// ===========================================
// Obtener Grupo
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Grupo.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, grupo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando grupo',
                        errors: err
                    });
                }

                Grupo.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        grupo: grupo,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Grupo By Id
// ===========================================

app.post('/grupo', (req, res, next) => {

    var body = req.body;
    var id = body.idgrupo;

    Grupo.findById(id)
        .exec(
            (err, grupo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando grupo',
                        errors: err
                    });
                }

                Grupo.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        grupo: grupo

                    });
                })



            })

});

////////////////////
/// Crear Grupo
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var grupo = new Grupo({
        grupo: body.grupo
    });

    grupo.save((err, grupoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Grupo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            grupo: grupoGuardado
        });
    });



});


////////////////////
/// Actualizar Grupo
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Grupo.findById(id, (err, grupo) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar grupo',
                errors: err
            });
        }

        if (!grupo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El grupo con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        grupo.grupo = body.grupo;

        grupo.save((err, grupoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar grupo',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                grupo: grupoGuardado
            });
        });

    });

});



module.exports = app;