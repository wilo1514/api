const model = require('./model')

function get_empresa( filtro_empresa ) {
    let filtro = {}
    if (filtro_empresa) {
        filtro = { nombre: filtro_empresa }
    }
    const objeto = model.find( filtro )
    return objeto
}

function add_empresa( empresa ) {
    const objeto = new model( empresa )
    objeto.save()
}

module.exports = {
    add: add_empresa,
    get: get_empresa,
}