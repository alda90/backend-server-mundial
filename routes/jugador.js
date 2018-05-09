var express = require('express');
var app = express();

var Jugador = require('../models/jugador');


// ===========================================
// Obtener Jugadores
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Jugador.find({})
        .populate('pais', 'pais')
        .exec(
            (err, jugador) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando jugador',
                        errors: err
                    });
                }

                Jugador.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        jugador: jugador,
                        total: conteo
                    });
                })



            })

});

// ===========================================
// Obtener Jugador By Id
// ===========================================

app.post('/jugador', (req, res, next) => {

    var body = req.body;
    var id = body.idjugador;

    Jugador.findById(id)
        .populate('pais', 'pais')
        .exec(
            (err, jugador) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando jugador',
                        errors: err
                    });
                }

                Jugador.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        jugador: jugador

                    });
                })



            })

});

// ===========================================
// Obtener Jugador By Pais
// ===========================================

app.post('/pais', (req, res, next) => {

    var body = req.body;
    var idpais = body.idpais;

    Jugador.find({ pais: idpais })
        .populate('pais', 'pais')
        .exec(
            (err, jugador) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando jugador',
                        errors: err
                    });
                }

                Jugador.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        jugador: jugador

                    });
                })



            })

});


////////////////////
/// Crear Jugador
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var jugador = new Jugador({
        nombre: body.nombre,
        nombrecompleto: body.nombrecompleto,
        nombrelocal: body.nombrelocal,
        numero: body.numero,
        nacimiento: body.nacimiento,
        fechanac: body.fechanac,
        posicion: body.posicion,
        pais: body.pais
    });

    jugador.save((err, jugadorGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Jugador',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            jugador: jugadorGuardado
        });
    });



});

////////////////////
/// Actualizar Jugador
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Jugador.findById(id, (err, jugador) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar jugador',
                errors: err
            });
        }

        if (!jugador) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El jugador con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        jugador.nombre = body.nombre;
        jugador.nombrecompleto = body.nombrecompleto;
        jugador.nombrelocal = body.nombrelocal;
        jugador.numero = body.numero;
        jugador.nacimiento = body.nacimiento;
        jugador.fechanac = body.fechanac;
        jugador.posicion = body.posicion;
        jugador.pais = body.pais;

        jugador.save((err, jugadorGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar jugador',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                jugador: jugadorGuardado
            });
        });

    });

});



module.exports = app;