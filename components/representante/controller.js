const storage = require('./storage')

function get_representante( filtro_representante ) {
    return new Promise((resolve, reject) => {
        resolve( storage.get( filtro_representante ) )
    })
}

function add_representante( representante ) {
    return new Promise((resolve, reject) => {
        if (!representante.rucrep) {
            return reject('No hay datos suficientes.')
        }
        storage.add( representante )
        resolve( representante )        
    })
}


module.exports = {
    get_representante,
    add_representante,
}