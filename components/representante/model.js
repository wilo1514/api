const mongoose = require('mongoose')
const Schema = mongoose.Schema


const req_number = {
    type: Number,
    required: true,
}
const req_string = {
    type: String,
    required: true,
}



const empresa_detalle_schema = new Schema({
    empresa: {
        type: Schema.ObjectId,
        ref: 'empresa',
    }
}, {
    timestamps: true,
})
const representante_schema = new Schema({

    rucrep: req_number,
    cedula: req_number,
    nombre: req_string,
    apellido: req_string,
    email: req_string,
    domicilio: req_string,
    telefono: req_number,

    representante_detalle: [empresa_detalle_schema]
}, {
    timestamps: true,
})

const model = mongoose.model('Representante', representante_schema)
module.exports = model