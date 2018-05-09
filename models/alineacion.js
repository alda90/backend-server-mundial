var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var alineacionSchema = new Schema({
    estatus: { type: String, required: [true, 'El estatus es necesario'] },
    capitan: { type: String, required: [true, 'El capitan es necesario'] },
    partido: {
        type: Schema.Types.ObjectId,
        ref: 'Partido',
        required: [true, 'El id del partido es un campo obligatorio ']
    },
    jugador: {
        type: Schema.Types.ObjectId,
        ref: 'Jugador',
        required: [true, 'El id del jugador un campo obligatorio ']
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: [true, 'El id del pais es un campo obligatorio ']
    }
}, { collection: 'alineaciones' });


module.exports = mongoose.model('Alineacion', alineacionSchema);