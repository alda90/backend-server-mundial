var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var partidoSchema = new Schema({
    partido: { type: String, required: [true, 'El partido es necesario'] },
    local: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: [false, 'El id del país local es un campo obligatorio ']
    },
    visitante: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: [false, 'El id del país visitante es un campo obligatorio ']
    },
    goleslocal: { type: String, required: false },
    golesvisitante: { type: String, required: false },
    ganador: { type: String, required: false },
    estatus: { type: String, required: [true, 'El estatus es necesario'] },
    conclusion: { type: String, required: false },
    goleslocalp: { type: String, required: false },
    golesvisitantep: { type: String, required: false },
    fase: { type: String, required: [false, 'La fase es necesaria'] },
    fecha: { type: String, required: [false, 'La fecha es necesaria'] },
    hora: { type: String, required: [false, 'La hora es necesaria'] },
    grupo: {
        type: Schema.Types.ObjectId,
        ref: 'Grupo',
        required: [false, 'El id del grupo es un campo obligatorio ']
    },
    estadio: {
        type: Schema.Types.ObjectId,
        ref: 'Estadio',
        required: [false, 'El id del estadio es un campo obligatorio ']
    }
});


module.exports = mongoose.model('Partido', partidoSchema);