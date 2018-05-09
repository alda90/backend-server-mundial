var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var arbitroSchema = new Schema({
    arbitro: { type: String, required: [true, 'El arbitro es necesario'] },
    pais: { type: String, required: [true, 'El país es necesario'] },
    bandera: { type: String, required: false },
    posicion: { type: String, required: [true, 'La posición es necesaria'] }
});


module.exports = mongoose.model('Arbitro', arbitroSchema);