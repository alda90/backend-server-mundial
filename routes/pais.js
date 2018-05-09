var express = require('express');
var app = express();

var Pais = require('../models/pais');


// ===========================================
// Obtener Paiss
// ===========================================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Pais.find({})
        .populate('tecnico', 'tecnico, nombre')
        .populate('confederacion', 'confederacion, siglas')
        .exec(
            (err, pais) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando pais',
                        errors: err
                    });
                }

                Pais.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        pais: pais,
                        total: conteo
                    });
                })



            })

});


app.post('/pais', (req, res, next) => {

    var body = req.body;
    var id = body.idpais;

    Pais.findById(id)
        .populate('tecnico', 'nombre')
        .populate('confederacion', 'siglas')
        .exec(
            (err, pais) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando pais',
                        errors: err
                    });
                }

                Pais.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        pais: pais,
                        total: conteo
                    });
                })



            })

});

////////////////////
/// Crear Pais
/////////////////////////

app.post('/', (req, res) => {

    var body = req.body;
    var pais = new Pais({
        pais: body.pais,
        nombreingles: body.nombreingles,
        nombreoficial: body.nombreoficial,
        nombrelocal: body.nombrelocal,
        federacion: body.federacion,
        federacioningles: body.federacioningles,
        federacionlocal: body.federacionlocal,
        codigo: body.codigo,
        goleador: body.goleador,
        numgoles: body.numgoles,
        clasificacion: body.clasificacion,
        participaciones: body.participaciones,
        titulos: body.titulos,
        continente: body.continente,
        tecnico: body.tecnico,
        confederacion: body.confederacion
    });

    pais.save((err, paisGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Pais',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            pais: paisGuardado
        });
    });



});


////////////////////
/// Actualizar Pais
/////////////////////////

app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Pais.findById(id, (err, pais) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar pais',
                errors: err
            });
        }

        if (!pais) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El pais con el id: ' + id + 'no existe',
                errors: { message: 'Existe un error con ese ID' }
            });
        }

        pais.pais = body.pais;
        pais.nombreingles = body.nombreingles;
        pais.nombreoficial = body.nombreoficial;
        pais.nombrelocal = body.nombrelocal;
        pais.federacion = body.federacion;
        pais.federacioningles = body.federacioningles;
        pais.federacionlocal = body.federacionlocal;
        pais.codigo = body.codigo;
        pais.goleador = body.goleador;
        pais.numgoles = body.numgoles;
        pais.bandera = body.bandera;
        pais.clasificacion = body.clasificacion;
        pais.participaciones = body.participaciones;
        pais.titulos = body.titulos;
        pais.continente = body.continente;
        pais.tecnico = body.tecnico;
        pais.confederacion = body.confederacion;


        pais.save((err, paisGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar pais',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                pais: paisGuardado
            });
        });

    });

});



module.exports = app;