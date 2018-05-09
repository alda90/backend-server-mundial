var express = require('express');
var app = express();

var Estadistica = require('../models/estadistica');


// ===========================================
// Obtener Estadisticas
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Estadistica.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, estadistica) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando estadistica',
                        errors: err
                    });
                }

                Estadistica.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        estadistica: estadistica,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Estadisticas en Grupo
// ===========================================

app.get('/grupos', (req, res, next) => {


    Estadistica.find({})
        .populate('pais', 'pais bandera')
        .populate('grupo', 'grupo')
        .exec(
            (err, estadistica) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando estadistica',
                        errors: err
                    });
                }

                Estadistica.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        estadistica: estadistica,
                        total: conteo
                    });
                })



            })

});

////////////////////
/// Crear Estadistica
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var estadistica = new Estadistica({
        partidos: body.partidos,
        puntos: body.puntos,
        anotados: body.anotados,
        recibidos: body.recibidos,
        diferencia: body.diferencia,
        ganados: body.ganados,
        empatados: body.empatados,
        perdidos: body.perdidos,
        pais: body.pais,
        grupo: body.grupo
    });

    estadistica.save((err, estadisticaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Estadistica',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            estadistica: estadisticaGuardado
        });
    });



});


////////////////////
/// Actualizar Estadistica
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Estadistica.findById(id, (err, estadistica) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar estadistica',
                errors: err
            });
        }

        if (!estadistica) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El estadistica con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        estadistica.partidos = body.partidos;
        estadistica.puntos = body.puntos;
        estadistica.anotados = body.anotados;
        estadistica.recibidos = body.recibidos;
        estadistica.diferencia = body.diferencia;
        estadistica.ganados = body.ganados;
        estadistica.empatados = body.empatados;
        estadistica.perdidos = body.perdidos;
        estadistica.pais = body.pais;
        estadistica.grupo = body.grupo;


        estadistica.save((err, estadisticaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar estadistica',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                estadistica: estadisticaGuardado
            });
        });

    });

});



module.exports = app;