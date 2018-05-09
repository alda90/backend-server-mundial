var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tecnicoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    pais: { type: String, required: [true, 'El pais es necesario'] },
    nacimiento: { type: String, required: false },
    fechanac: { type: String, required: false },
    nombrecompleto: { type: String, required: [true, 'El nombre completo es necesario'] },
    nombrelocal: { type: String, required: false },
    bandera: { type: String, required: false },
    img: { type: String, required: false }
});

module.exports = mongoose.model('Tecnico', tecnicoSchema);