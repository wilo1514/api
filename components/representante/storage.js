const model = require('./model')

function get_representante( filtro_representante ) {
        let filtro = {}
        if (filtro_representante) {
            filtro = { nombre: filtro_representante }
        }
        const objeto = model.find(filtro)
        return objeto
}

function add_representante( representante ) {

    const objeto = new model( representante )
    objeto.save()
}

module.exports = {
    add: add_representante,
    get: get_representante,
}