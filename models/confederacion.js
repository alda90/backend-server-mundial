var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var confederacionSchema = new Schema({
    confederacion: { type: String, required: [true, 'La confederacion es necesario'] },
    acronimo: { type: String, required: [true, 'El acronimo es necesario'] },
    siglas: { type: String, required: [true, 'Las siglas son necesarias'] },
    fundacion: { type: String, required: [true, 'La fundacion es necesaria'] },
    sede: { type: String, required: [true, 'La sede es necesaria'] },
    ambito: { type: String, required: [true, 'El ambito es necesario'] },
    presidente: { type: String, required: [true, 'El presidente es necesario'] }
}, { collection: 'confederaciones' });

module.exports = mongoose.model('Confederacion', confederacionSchema);