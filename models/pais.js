var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var paisSchema = new Schema({
    pais: { type: String, required: [true, 'El pais es necesario'] },
    nombreingles: { type: String, required: [true, 'El nombre en inglés es necesario'] },
    nombreoficial: { type: String, required: [true, 'El nombre oficial es necesario'] },
    nombrelocal: { type: String, required: [true, 'El nombre local es necesario'] },
    federacion: { type: String, required: [true, 'La federación es necesaria'] },
    federacioningles: { type: String, required: false },
    federacionlocal: { type: String, required: [true, 'La federación local es necesaria'] },
    codigo: { type: String, required: [true, 'El código es necesario'] },
    goleador: { type: String, required: false },
    numgoles: { type: String, required: false },
    bandera: { type: String, required: false },
    escudo: { type: String, required: false },
    uniforme: { type: String, required: false },
    uniformev: { type: String, required: false },
    clasificacion: { type: String, required: false },
    participaciones: { type: String, required: false },
    titulos: { type: String, required: false },
    escudofed: { type: String, required: false },
    continente: { type: String, required: [true, 'El continente es necesario'] },
    tecnico: {
        type: Schema.Types.ObjectId,
        ref: 'Tecnico',
        required: [true, 'El id del tecnico es un campo obligatorio ']
    },
    confederacion: {
        type: Schema.Types.ObjectId,
        ref: 'Confederacion',
        required: [true, 'El id de la confederación es un campo obligatorio ']
    }
}, { collection: 'paises' });

module.exports = mongoose.model('Pais', paisSchema);