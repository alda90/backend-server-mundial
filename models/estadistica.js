var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var estadisticaSchema = new Schema({
    partidos: { type: String, required: false },
    puntos: { type: String, required: false },
    anotados: { type: String, required: false },
    recibidos: { type: String, required: false },
    diferencia: { type: String, required: false },
    ganados: { type: String, required: false },
    empatados: { type: String, required: false },
    perdidos: { type: String, required: false },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: [true, 'El id del pais es un campo obligatorio ']
    },
    grupo: {
        type: Schema.Types.ObjectId,
        ref: 'Grupo',
        required: [true, 'El id del grupo es un campo obligatorio ']
    }
});


module.exports = mongoose.model('Estadistica', estadisticaSchema);