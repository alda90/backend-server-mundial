var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var seudonimoSchema = new Schema({
    seudonimo: { type: String, required: [true, 'El seudonimo es necesario'] },
    local: { type: String, required: [true, 'El seudonimo local es necesario'] },
    localocc: { type: String, required: [true, 'El seudonimo en occidental es necesario'] },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: [true, 'El id del país es un campo obligatorio ']
    }
});


module.exports = mongoose.model('Seudonimo', seudonimoSchema);