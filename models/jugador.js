var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;


var jugadorSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    nombrecompleto: { type: String, required: [true, 'El nombre completo es necesario'] },
    nombrelocal: { type: String, required: [true, 'El nombre local es necesario'] },
    img: { type: String, required: false },
    numero: { type: String, required: false },
    nacimiento: { type: String, required: [true, 'El lugar de nacimiento es necesario'] },
    fechanac: { type: String, required: [true, 'La fecha de nacimiento es necesaria'] },
    posicion: { type: String, required: [true, 'La posición es necesaria'] },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: [true, 'El id del país es un campo obligatorio ']
    }
}, { collection: 'jugadores' });


module.exports = mongoose.model('Jugador', jugadorSchema);