const empresa = require('../components/empresa/interface')
const representante = require('../components/representante/interface')

const routes = function(server) {
    server.use('/empresa', empresa)
    server.use('/representante',representante)
}

module.exports = routes