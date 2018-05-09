var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var incidenciaSchema = new Schema({
    incidencia: { type: String, required: [true, 'La incidencia es necesaria'] },
    sustituto: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',
        required: false,

    },
    minuto: { type: String, required: false },
    numpenal: { type: String, required: false },
    partido: {
        type: Schema.Types.ObjectId,
        ref: 'Partido',
    },
    jugador: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',
        required: false,
    },
    tecnico: {
        type: Schema.Types.ObjectId,
        ref: 'Tecnico',
        required: false
    }
});


module.exports = mongoose.model('Incidencia', incidenciaSchema);