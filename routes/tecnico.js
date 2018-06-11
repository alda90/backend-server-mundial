var express = require('express');
var app = express();

var Tecnico = require('../models/tecnico');


// ===========================================
// Obtener Tecnico
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Tecnico.find({})
        .exec(
            (err, tecnico) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando tecnico',
                        errors: err
                    });
                }

                Tecnico.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        tecnico: tecnico,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Tecnico By Id
// ===========================================

app.post('/tecnico', (req, res, next) => {

    var body = req.body;
    var id = body.idtecnico;

    Tecnico.findById(id)
        .exec(
            (err, tecnico) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando tecnico',
                        errors: err
                    });
                }

                Tecnico.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        tecnico: tecnico

                    });
                })



            })

});

////////////////////
/// Crear Tecnico
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var tecnico = new Tecnico({
        nombre: body.nombre,
        pais: body.pais,
        nacimiento: body.nacimiento,
        fechanac: body.fechanac,
        nombrecompleto: body.nombrecompleto,
        nombrelocal: body.nombrelocal
    });

    tecnico.save((err, tecnicoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Tecnico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            tecnico: tecnicoGuardado
        });
    });



});

////////////////////
/// Actualizar Tecnico
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Tecnico.findById(id, (err, tecnico) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar tecnico',
                errors: err
            });
        }

        if (!tecnico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tecnico con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        tecnico.nombre = body.nombre;
        tecnico.pais = body.pais;
        tecnico.nacimiento = body.nacimiento;
        tecnico.fechanac = body.fechanac;
        tecnico.nombrecompleto = body.nombrecompleto;
        tecnico.nombrelocal = body.nombrelocal;


        tecnico.save((err, tecnicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar tecnico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                tecnico: tecnicoGuardado
            });
        });

    });

});

// ===========================================
// Borrar Tecnico
// ===========================================


app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Tecnico.findByIdAndRemove(id, (err, tecnicoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar tecnico',
                errors: err
            });
        }

        if (!tecnicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe tecnico con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            tecnico: tecnicoBorrado
        });
    });
});



module.exports = app;