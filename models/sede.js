var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var sedeSchema = new Schema({
    sede: { type: String, required: [true, 'La sede es necesaria'] },
    sedeingles: { type: String, required: [true, 'La sede en inglés es necesaria'] },
    sedelocal: { type: String, required: [true, 'La sede local es necesaria'] }
});


module.exports = mongoose.model('Sede', sedeSchema);