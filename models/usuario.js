var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var tiposValidos = {
    values: ['ADMINISTRADOR', 'USUARIO'],
    message: '{VALUE} no es un tipo permitido'
}

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesario'] },
    img: { type: String, required: false },
    tipo: { type: String, required: true, default: 'USUARIO', enum: tiposValidos }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} El correo debe de ser unico' })

module.exports = mongoose.model('Usuario', usuarioSchema);