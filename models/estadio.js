var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var estadioSchema = new Schema({
    estadio: { type: String, required: [true, 'El estadio es necesario'] },
    completo: { type: String, required: [true, 'El nombre completo es necesario'] },
    estadiolocal: { type: String, required: [true, 'El nombre local es necesario'] },
    capacidad: { type: String, required: [true, 'La capacidad es necesaria'] },
    img: { type: String, required: false },
    sede: {
        type: Schema.Types.ObjectId,
        ref: 'Sede',
        required: [true, 'El id de la sede es un campo obligatorio ']
    }
});


module.exports = mongoose.model('Estadio', estadioSchema);