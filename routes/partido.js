var express = require('express');
var app = express();

var Partido = require('../models/partido');


// ===========================================
// Obtener Partido
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Partido.find({})
        .populate('local', 'pais bandera')
        .populate('visitante', 'pais bandera')
        .populate('grupo', 'grupo')
        .populate('estadio', 'estadio')
        .exec(
            (err, partido) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando partido',
                        errors: err
                    });
                }

                Partido.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        partido: partido,
                        total: conteo
                    });
                })



            })

});


// ===========================================
// Obtener Partido By Id
// ===========================================

app.post('/partido', (req, res, next) => {

    var body = req.body;
    var id = body.idpartido;

    Partido.findById(id)
        .exec(
            (err, partido) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando partido',
                        errors: err
                    });
                }

                Partido.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        partido: partido

                    });
                })



            })

});

// ===========================================
// Obtener Partido por fecha
// ===========================================

app.post('/fecha', (req, res, next) => {

    var body = req.body;
    var fecha = body.fecha;

    Partido.find({ fecha: fecha })
        // .populate('local', 'pais tecnico bandera')
        // .populate('visitante', 'pais tecnico bandera')
        // .populate('grupo', 'grupo')
        // .populate('estadio', 'estadio')
        .exec(
            (err, partido) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando partido',
                        errors: err
                    });
                }

                Partido.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        partido: partido,
                        total: conteo
                    });
                })



            })

});

////////////////////
/// Crear Partido
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var partido = new Partido({
        partido: body.partido,
        local: body.local,
        visitante: body.visitante,
        goleslocal: body.goleslocal,
        golesvisitante: body.golesvisitante,
        ganador: body.ganador,
        estatus: body.estatus,
        conclusion: body.conclusion,
        goleslocalp: body.goleslocalp,
        golesvisitantep: body.golesvisitantep,
        fase: body.fase,
        fecha: body.fecha,
        hora: body.hora,
        grupo: body.grupo,
        estadio: body.estadio
    });

    partido.save((err, partidoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Partido',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            partido: partidoGuardado
        });
    });



});


////////////////////
/// Actualizar Partido
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Partido.findById(id, (err, partido) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar partido',
                errors: err
            });
        }

        if (!partido) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El partido con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        partido.partido = body.partido;
        partido.local = body.local;
        partido.visitante = body.visitante;
        partido.goleslocal = body.goleslocal;
        partido.golesvisitante = body.golesvisitante;
        partido.ganador = body.ganador;
        partido.estatus = body.estatus;
        partido.conclusion = body.conclusion;
        partido.goleslocalp = body.goleslocalp;
        partido.golesvisitantep = body.golesvisitantep;
        partido.fase = body.fase;
        partido.fecha = body.fecha;
        partido.hora = body.hora;
        partido.grupo = body.grupo;
        partido.estadio = body.estadio;

        partido.save((err, partidoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar partido',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                partido: partidoGuardado
            });
        });

    });

});



module.exports = app;