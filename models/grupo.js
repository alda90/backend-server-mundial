var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var grupoSchema = new Schema({
    grupo: { type: String, required: [true, 'El grupo es necesario'] }
});


module.exports = mongoose.model('Grupo', grupoSchema);