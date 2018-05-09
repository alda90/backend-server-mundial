var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var arbitrospartSchema = new Schema({
    arbitro: {
        type: Schema.Types.ObjectId,
        ref: 'Arbitro',
        required: [true, 'El id del arbitro es un campo obligatorio ']
    },
    partido: {
        type: Schema.Types.ObjectId,
        ref: 'Partido',
        required: [true, 'El id del partido es un campo obligatorio ']
    },
    posicion: { type: String, required: [true, 'La posición es necesaria'] },
}, { collection: 'arbitrospart' });


module.exports = mongoose.model('Arbitrospart', arbitrospartSchema);